import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Trophy, TrendingUp, Camera, Target, Zap, Award, X, Plus } from 'lucide-react-native';
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

export default function ProgressScreen() {
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState([]);
  const [stats, setStats] = useState({
    totalCalories: 0,
    totalWorkouts: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [achievements, setAchievements] = useState([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [bodyMeasurements, setBodyMeasurements] = useState({
    weight: 70,
    bodyFat: 15,
    muscle: 45,
  });

  const modalScale = useSharedValue(0);
  const chartAnimations = useSharedValue(0);

  useEffect(() => {
    if (user) {
      fetchProgressData();
      fetchAchievements();
      animateCharts();
    }
  }, [user]);

  function animateCharts() {
    chartAnimations.value = withTiming(1, { duration: 1500 });
  }

  async function fetchProgressData() {
    try {
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - 7));

      const { data: activities, error } = await supabase
        .from('daily_activities')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', weekStart.toISOString())
        .order('date', { ascending: true });

      if (error) throw error;

      const weeklyStats = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const activity = activities.find(a => a.date === dateStr);
        weeklyStats.push({
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          calories: activity?.calories_burned || 0,
          exercises: Math.floor((activity?.exercise_minutes || 0) / 10),
        });
      }

      setWeeklyData(weeklyStats);

      // Calculate total stats
      const totalCalories = activities.reduce((sum, activity) => sum + (activity.calories_burned || 0), 0);
      const totalWorkouts = activities.length;
      
      setStats({
        totalCalories,
        totalWorkouts,
        currentStreak: 5, // Placeholder
        longestStreak: 12, // Placeholder
      });
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  }

  async function fetchAchievements() {
    // Mock achievements data with more detailed information
    setAchievements([
      { 
        id: 1, 
        title: 'First Workout', 
        description: 'Complete your first workout session', 
        unlocked: true, 
        icon: '🎯',
        unlockedDate: '2 days ago',
        points: 50
      },
      { 
        id: 2, 
        title: '7 Day Streak', 
        description: 'Workout for 7 consecutive days', 
        unlocked: true, 
        icon: '🔥',
        unlockedDate: '1 day ago',
        points: 100
      },
      { 
        id: 3, 
        title: '100 Calories', 
        description: 'Burn 100 calories in a single workout', 
        unlocked: true, 
        icon: '💪',
        unlockedDate: 'Today',
        points: 75
      },
      { 
        id: 4, 
        title: 'Early Bird', 
        description: 'Complete a workout before 8 AM', 
        unlocked: false, 
        icon: '🌅',
        points: 80
      },
      { 
        id: 5, 
        title: 'Consistency King', 
        description: 'Workout 30 days in a row', 
        unlocked: false, 
        icon: '👑',
        points: 200
      },
      { 
        id: 6, 
        title: 'Calorie Crusher', 
        description: 'Burn 1000 calories in a week', 
        unlocked: false, 
        icon: '🚀',
        points: 150
      },
    ]);
  }

  function openAchievementModal(achievement) {
    setSelectedAchievement(achievement);
    setShowAchievementModal(true);
    modalScale.value = withSpring(1);
  }

  function closeAchievementModal() {
    modalScale.value = withSpring(0, {}, () => {
      setShowAchievementModal(false);
      setSelectedAchievement(null);
    });
  }

  const renderWeeklyChart = () => {
    const maxCalories = Math.max(...weeklyData.map(d => d.calories), 1);
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>This Week's Progress</Text>
        <View style={styles.chart}>
          {weeklyData.map((day, index) => {
            const animatedStyle = useAnimatedStyle(() => {
              const height = interpolate(
                chartAnimations.value,
                [0, 1],
                [0, (day.calories / maxCalories) * 100]
              );
              return {
                height: `${Math.max(height, 4)}%`,
              };
            });

            return (
              <View key={index} style={styles.chartDay}>
                <View style={styles.chartBar}>
                  <Animated.View
                    style={[
                      styles.chartBarFill,
                      {
                        backgroundColor: day.calories > 0 ? '#FF6B35' : '#2A2A2A',
                      },
                      animatedStyle,
                    ]}
                  />
                </View>
                <Text style={styles.chartDayLabel}>{day.day}</Text>
                <Text style={styles.chartDayValue}>{day.calories}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderAchievementCard = (achievement) => (
    <TouchableOpacity
      key={achievement.id}
      style={[
        styles.achievementCard,
        !achievement.unlocked && styles.achievementCardLocked,
      ]}
      onPress={() => openAchievementModal(achievement)}
    >
      <LinearGradient
        colors={achievement.unlocked ? ['#FF6B35', '#F7931E'] : ['#2A2A2A', '#3A3A3A']}
        style={styles.achievementGradient}
      >
        <Text style={styles.achievementIcon}>{achievement.icon}</Text>
        <Text style={[
          styles.achievementTitle,
          !achievement.unlocked && styles.achievementTitleLocked,
        ]}>
          {achievement.title}
        </Text>
        <Text style={[
          styles.achievementDescription,
          !achievement.unlocked && styles.achievementDescriptionLocked,
        ]}>
          {achievement.description}
        </Text>
        {achievement.unlocked && (
          <View style={styles.unlockedBadge}>
            <Award size={12} color="#FFFFFF" />
          </View>
        )}
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{achievement.points}pts</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: modalScale.value }],
      opacity: modalScale.value,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Progress</Text>
            <TouchableOpacity style={styles.calendarButton}>
              <Calendar size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.statGradient}
              >
                <Zap size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{stats.totalCalories}</Text>
                <Text style={styles.statLabel}>Total Calories</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#6C5CE7', '#A29BFE']}
                style={styles.statGradient}
              >
                <Target size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.streakContainer}>
            <View style={styles.streakCard}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.streakGradient}
              >
                <View style={styles.streakHeader}>
                  <TrendingUp size={24} color="#FFFFFF" />
                  <Text style={styles.streakTitle}>Streak</Text>
                </View>
                <View style={styles.streakStats}>
                  <View style={styles.streakStat}>
                    <Text style={styles.streakValue}>{stats.currentStreak}</Text>
                    <Text style={styles.streakLabel}>Current</Text>
                  </View>
                  <View style={styles.streakDivider} />
                  <View style={styles.streakStat}>
                    <Text style={styles.streakValue}>{stats.longestStreak}</Text>
                    <Text style={styles.streakLabel}>Best</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>

          {renderWeeklyChart()}

          <View style={styles.bodyMeasurementsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Body Measurements</Text>
              <TouchableOpacity style={styles.addButton}>
                <Plus size={20} color="#FF6B35" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.measurementsGrid}>
              <View style={styles.measurementCard}>
                <Text style={styles.measurementValue}>{bodyMeasurements.weight}kg</Text>
                <Text style={styles.measurementLabel}>Weight</Text>
                <Text style={styles.measurementChange}>-2kg this month</Text>
              </View>
              <View style={styles.measurementCard}>
                <Text style={styles.measurementValue}>{bodyMeasurements.bodyFat}%</Text>
                <Text style={styles.measurementLabel}>Body Fat</Text>
                <Text style={styles.measurementChange}>-1% this month</Text>
              </View>
              <View style={styles.measurementCard}>
                <Text style={styles.measurementValue}>{bodyMeasurements.muscle}kg</Text>
                <Text style={styles.measurementLabel}>Muscle</Text>
                <Text style={styles.measurementChange}>+1kg this month</Text>
              </View>
            </View>
          </View>

          <View style={styles.achievementsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.achievementsList}
            >
              {achievements.map(renderAchievementCard)}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.photoButton}>
            <LinearGradient
              colors={['#FF6B6B', '#C44569']}
              style={styles.photoGradient}
            >
              <Camera size={24} color="#FFFFFF" />
              <Text style={styles.photoButtonText}>Add Progress Photo</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          visible={showAchievementModal}
          transparent
          animationType="fade"
          onRequestClose={closeAchievementModal}
        >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, modalAnimatedStyle]}>
              {selectedAchievement && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedAchievement.title}</Text>
                    <TouchableOpacity onPress={closeAchievementModal}>
                      <X size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.modalBody}>
                    <Text style={styles.modalIcon}>{selectedAchievement.icon}</Text>
                    <Text style={styles.modalDescription}>{selectedAchievement.description}</Text>
                    <Text style={styles.modalPoints}>{selectedAchievement.points} Points</Text>
                    
                    {selectedAchievement.unlocked ? (
                      <View style={styles.unlockedContainer}>
                        <Text style={styles.unlockedText}>Unlocked {selectedAchievement.unlockedDate}</Text>
                        <TouchableOpacity style={styles.shareButton}>
                          <Text style={styles.shareButtonText}>Share Achievement</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <Text style={styles.lockedText}>Keep working to unlock this achievement!</Text>
                    )}
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
  scrollView: {
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
  calendarButton: {
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
  streakContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  streakCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  streakGradient: {
    padding: 20,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  streakStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakStat: {
    alignItems: 'center',
    flex: 1,
  },
  streakValue: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  streakLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
    marginTop: 4,
  },
  streakDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#FFFFFF20',
    marginHorizontal: 20,
  },
  chartContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartDay: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    height: 80,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBarFill: {
    width: '100%',
    borderRadius: 10,
    minHeight: 4,
  },
  chartDayLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
    marginBottom: 4,
  },
  chartDayValue: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  bodyMeasurementsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  measurementsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  measurementCard: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  measurementValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  measurementLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
    marginBottom: 8,
  },
  measurementChange: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#4ECDC4',
  },
  achievementsSection: {
    marginBottom: 24,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
  },
  achievementsList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  achievementCard: {
    width: 140,
    borderRadius: 16,
    overflow: 'hidden',
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 140,
    position: 'relative',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#FFFFFF60',
  },
  achievementDescription: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF80',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 8,
  },
  achievementDescriptionLocked: {
    color: '#FFFFFF40',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsBadge: {
    backgroundColor: '#FFFFFF20',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  pointsText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  photoButton: {
    marginHorizontal: 24,
    marginBottom: 100,
    borderRadius: 16,
    overflow: 'hidden',
  },
  photoGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  photoButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
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
    maxHeight: '70%',
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
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    flex: 1,
  },
  modalBody: {
    padding: 24,
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  modalPoints: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginBottom: 24,
  },
  unlockedContainer: {
    alignItems: 'center',
  },
  unlockedText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ECDC4',
    marginBottom: 16,
  },
  shareButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  shareButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  lockedText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF80',
    textAlign: 'center',
  },
});