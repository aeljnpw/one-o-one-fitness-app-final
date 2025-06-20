import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Play, Clock, Target, Zap, X, CheckCircle } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming,
  interpolate
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function WorkoutsScreen() {
  const { user } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [dailyProgress, setDailyProgress] = useState({ completed: 0, goal: 3 });
  const [streak, setStreak] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  const modalScale = useSharedValue(0);
  const progressAnimation = useSharedValue(0);

  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Core', 'Shoulders'];

  useEffect(() => {
    if (user) {
      fetchExercises();
      fetchDailyProgress();
      fetchStreak();
    }
  }, [user]);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchQuery, selectedFilter]);

  useEffect(() => {
    progressAnimation.value = withTiming(dailyProgress.completed / dailyProgress.goal, {
      duration: 1000,
    });
  }, [dailyProgress]);

  async function fetchExercises() {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExercises(data || []);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  }

  async function fetchDailyProgress() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('daily_activities')
        .select('exercise_minutes')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      const completed = data ? Math.floor((data.exercise_minutes || 0) / 10) : 0;
      setDailyProgress({ completed, goal: 3 });
    } catch (error) {
      console.error('Error fetching daily progress:', error);
    }
  }

  async function fetchStreak() {
    setStreak(5); // Placeholder
  }

  function filterExercises() {
    let filtered = exercises;

    if (searchQuery) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscle_group.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter !== 'All') {
      filtered = filtered.filter(exercise =>
        exercise.difficulty === selectedFilter
      );
    }

    setFilteredExercises(filtered);
  }

  function openExerciseModal(exercise) {
    setSelectedExercise(exercise);
    setShowExerciseModal(true);
    modalScale.value = withSpring(1);
  }

  function closeExerciseModal() {
    modalScale.value = withSpring(0, {}, () => {
      setShowExerciseModal(false);
      setSelectedExercise(null);
    });
  }

  async function startWorkout(exercise) {
    try {
      // Mark exercise as completed
      setCompletedExercises(prev => new Set([...prev, exercise.id]));
      
      // Update daily progress
      const newCompleted = dailyProgress.completed + 1;
      setDailyProgress(prev => ({ ...prev, completed: newCompleted }));

      // Update database
      const today = new Date().toISOString().split('T')[0];
      const { error } = await supabase
        .from('daily_activities')
        .upsert({
          user_id: user.id,
          date: today,
          exercise_minutes: newCompleted * 10,
          calories_burned: newCompleted * 50,
        });

      if (error) throw error;

      Alert.alert('Great Job!', `You completed ${exercise.name}! Keep it up!`);
      closeExerciseModal();
    } catch (error) {
      console.error('Error updating workout:', error);
      Alert.alert('Error', 'Failed to record workout. Please try again.');
    }
  }

  const renderExerciseCard = ({ item }) => {
    const isCompleted = completedExercises.has(item.id);
    
    return (
      <TouchableOpacity 
        style={styles.exerciseCard} 
        onPress={() => openExerciseModal(item)}
      >
        <LinearGradient
          colors={getDifficultyColors(item.difficulty)}
          style={styles.exerciseGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.exerciseHeader}>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
            {isCompleted ? (
              <CheckCircle size={20} color="#4ECDC4" />
            ) : (
              <TouchableOpacity style={styles.playButton}>
                <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.exerciseContent}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.muscleGroup}>{item.muscle_group}</Text>
            
            <View style={styles.exerciseStats}>
              <View style={styles.statItem}>
                <Clock size={14} color="#FFFFFF80" />
                <Text style={styles.statText}>{item.duration || '15 min'}</Text>
              </View>
              <View style={styles.statItem}>
                <Target size={14} color="#FFFFFF80" />
                <Text style={styles.statText}>{item.equipment || 'No Equipment'}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const progressAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(progressAnimation.value, [0, 1], [0, 100]);
    return {
      width: `${Math.min(width, 100)}%`,
    };
  });

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: modalScale.value }],
      opacity: modalScale.value,
    };
  });

  function getDifficultyColors(difficulty) {
    switch (difficulty) {
      case 'Beginner':
        return ['#4ECDC4', '#44A08D'];
      case 'Intermediate':
        return ['#FFD93D', '#FF6B35'];
      case 'Advanced':
        return ['#FF6B6B', '#C44569'];
      default:
        return ['#6C5CE7', '#A29BFE'];
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Workouts</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#FF6B35', '#F7931E']}
              style={styles.statGradient}
            >
              <Zap size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{dailyProgress.completed}/{dailyProgress.goal}</Text>
              <Text style={styles.statLabel}>Today's Goal</Text>
              <View style={styles.progressBar}>
                <Animated.View style={[styles.progressFill, progressAnimatedStyle]} />
              </View>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#6C5CE7', '#A29BFE']}
              style={styles.statGradient}
            >
              <Target size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search exercises..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.filterChipTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredExercises}
          renderItem={renderExerciseCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.exercisesList}
          showsVerticalScrollIndicator={false}
        />

        <Modal
          visible={showExerciseModal}
          transparent
          animationType="fade"
          onRequestClose={closeExerciseModal}
        >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, modalAnimatedStyle]}>
              {selectedExercise && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
                    <TouchableOpacity onPress={closeExerciseModal}>
                      <X size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.modalBody}>
                    <Text style={styles.modalMuscleGroup}>{selectedExercise.muscle_group}</Text>
                    <Text style={styles.modalDifficulty}>{selectedExercise.difficulty}</Text>
                    
                    {selectedExercise.instructions && (
                      <View style={styles.instructionsContainer}>
                        <Text style={styles.instructionsTitle}>Instructions:</Text>
                        {selectedExercise.instructions.map((instruction, index) => (
                          <Text key={index} style={styles.instructionText}>
                            {index + 1}. {instruction}
                          </Text>
                        ))}
                      </View>
                    )}
                    
                    <TouchableOpacity
                      style={styles.startWorkoutButton}
                      onPress={() => startWorkout(selectedExercise)}
                    >
                      <LinearGradient
                        colors={['#FF6B35', '#F7931E']}
                        style={styles.startWorkoutGradient}
                      >
                        <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
                        <Text style={styles.startWorkoutText}>Start Workout</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Animated.View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
    marginTop: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#FFFFFF20',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  filtersContainer: {
    marginBottom: 24,
  },
  filtersContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterChip: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterChipActive: {
    backgroundColor: '#FF6B35',
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  exercisesList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  exerciseCard: {
    width: (width - 64) / 2,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  exerciseGradient: {
    padding: 16,
    minHeight: 180,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  difficultyBadge: {
    backgroundColor: '#FFFFFF20',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  muscleGroup: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
    marginBottom: 12,
  },
  exerciseStats: {
    gap: 6,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#2A2A2A',
    borderRadius: 24,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    flex: 1,
  },
  modalBody: {
    padding: 24,
  },
  modalMuscleGroup: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
    marginBottom: 8,
  },
  modalDifficulty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF80',
    marginBottom: 24,
  },
  instructionsContainer: {
    marginBottom: 32,
  },
  instructionsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 8,
  },
  startWorkoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  startWorkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  startWorkoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});