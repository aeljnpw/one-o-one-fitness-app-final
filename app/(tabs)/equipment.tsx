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
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Wrench, Info, X, Dumbbell } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function EquipmentScreen() {
  const { user } = useAuth();
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [relatedExercises, setRelatedExercises] = useState([]);

  const modalScale = useSharedValue(0);

  const categories = ['All', 'Benches', 'Machines', 'No Equipment', 'Free Weights', 'Cardio'];

  useEffect(() => {
    fetchEquipment();
  }, []);

  useEffect(() => {
    filterEquipment();
  }, [equipment, searchQuery, selectedCategory]);

  async function fetchEquipment() {
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEquipment(data || []);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  }

  async function fetchRelatedExercises(equipmentName) {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .ilike('equipment', `%${equipmentName}%`)
        .limit(5);

      if (error) throw error;
      setRelatedExercises(data || []);
    } catch (error) {
      console.error('Error fetching related exercises:', error);
      setRelatedExercises([]);
    }
  }

  function filterEquipment() {
    let filtered = equipment;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item =>
        item.category === selectedCategory
      );
    }

    setFilteredEquipment(filtered);
  }

  function openEquipmentModal(item) {
    setSelectedEquipment(item);
    setShowEquipmentModal(true);
    modalScale.value = withSpring(1);
    fetchRelatedExercises(item.name);
  }

  function closeEquipmentModal() {
    modalScale.value = withSpring(0, {}, () => {
      setShowEquipmentModal(false);
      setSelectedEquipment(null);
      setRelatedExercises([]);
    });
  }

  const renderEquipmentCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.equipmentCard}
      onPress={() => openEquipmentModal(item)}
    >
      <LinearGradient
        colors={getCategoryColors(item.category)}
        style={styles.equipmentGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.equipmentHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <Info size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.equipmentContent}>
          <View style={styles.equipmentIcon}>
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.equipmentImage} />
            ) : (
              <Wrench size={32} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.equipmentName}>{item.name}</Text>
          <Text style={styles.equipmentDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        <TouchableOpacity style={styles.viewExercisesButton}>
          <Text style={styles.viewExercisesText}>View Exercises</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: modalScale.value }],
      opacity: modalScale.value,
    };
  });

  function getCategoryColors(category) {
    switch (category) {
      case 'Benches':
        return ['#FF6B35', '#F7931E'];
      case 'Machines':
        return ['#6C5CE7', '#A29BFE'];
      case 'No Equipment':
        return ['#4ECDC4', '#44A08D'];
      case 'Free Weights':
        return ['#FF6B6B', '#C44569'];
      case 'Cardio':
        return ['#FFD93D', '#FF6B35'];
      default:
        return ['#2A2A2A', '#3A3A3A'];
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Equipment</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search equipment..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredEquipment}
          renderItem={renderEquipmentCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.equipmentList}
          showsVerticalScrollIndicator={false}
        />

        <Modal
          visible={showEquipmentModal}
          transparent
          animationType="fade"
          onRequestClose={closeEquipmentModal}
        >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, modalAnimatedStyle]}>
              {selectedEquipment && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedEquipment.name}</Text>
                    <TouchableOpacity onPress={closeEquipmentModal}>
                      <X size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  
                  <ScrollView style={styles.modalBody}>
                    <Text style={styles.modalCategory}>{selectedEquipment.category}</Text>
                    <Text style={styles.modalDescription}>{selectedEquipment.description}</Text>
                    
                    <View style={styles.safetyTipsContainer}>
                      <Text style={styles.sectionTitle}>Safety Tips:</Text>
                      <Text style={styles.safetyTip}>• Always warm up before using equipment</Text>
                      <Text style={styles.safetyTip}>• Check equipment for damage before use</Text>
                      <Text style={styles.safetyTip}>• Use proper form to prevent injury</Text>
                      <Text style={styles.safetyTip}>• Start with lighter weights and progress gradually</Text>
                    </View>

                    {relatedExercises.length > 0 && (
                      <View style={styles.relatedExercisesContainer}>
                        <Text style={styles.sectionTitle}>Related Exercises:</Text>
                        {relatedExercises.map((exercise, index) => (
                          <View key={index} style={styles.exerciseItem}>
                            <Dumbbell size={16} color="#FF6B35" />
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            <Text style={styles.exerciseDifficulty}>{exercise.difficulty}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </ScrollView>
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
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryChip: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryChipActive: {
    backgroundColor: '#FF6B35',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  equipmentList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  equipmentCard: {
    width: (width - 64) / 2,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  equipmentGradient: {
    padding: 16,
    minHeight: 220,
  },
  equipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: '#FFFFFF20',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  infoButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  equipmentContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  equipmentIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  equipmentImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  equipmentName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  equipmentDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF80',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 16,
  },
  viewExercisesButton: {
    backgroundColor: '#FFFFFF20',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  viewExercisesText: {
    fontSize: 12,
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
    maxHeight: 400,
  },
  modalCategory: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 24,
  },
  safetyTipsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  safetyTip: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF80',
    lineHeight: 20,
    marginBottom: 4,
  },
  relatedExercisesContainer: {
    marginBottom: 24,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 12,
  },
  exerciseDifficulty: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF60',
  },
});