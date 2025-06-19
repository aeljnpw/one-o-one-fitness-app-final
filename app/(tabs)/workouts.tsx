import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { EquipmentCard } from '@/components/EquipmentCard';
import { ExerciseCard } from '@/components/ExerciseCard';

export default function WorkoutsScreen() {
  const { user } = useAuth();
  const [equipment, setEquipment] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [stats, setStats] = useState({
    weeklyDuration: 0,
    totalWorkouts: 0,
    totalCalories: 0,
  });

  useEffect(() => {
    if (user) {
      fetchEquipment();
      fetchExercises();
      fetchStats();
    }
  }, [user]);

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

  async function fetchExercises() {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*, equipment(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExercises(data || []);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  }

  async function fetchStats() {
    try {
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - 7));

      const { data: workouts, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', weekStart.toISOString());

      if (error) throw error;

      const weeklyDuration = workouts.reduce((sum, workout) => sum + (workout.duration || 0), 0);
      const totalWorkouts = workouts.length;
      const totalCalories = workouts.reduce((sum, workout) => sum + (workout.calories_burned || 0), 0);

      setStats({ weeklyDuration, totalWorkouts, totalCalories });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1C1C1E', '#2C2C2E']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Workouts</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.round(stats.weeklyDuration / 60)}h {stats.weeklyDuration % 60}m</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalCalories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Equipment</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {equipment.map((item, index) => (
                <EquipmentCard key={index} equipment={item} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <View style={styles.exercisesGrid}>
              {exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseWrapper}>
                  <ExerciseCard exercise={exercise} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
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
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  horizontalScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  exercisesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  exerciseWrapper: {
    width: '100%',
  },
});