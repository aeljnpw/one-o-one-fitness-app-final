import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityRings } from '@/components/ActivityRings';
import { ActivityCard } from '@/components/ActivityCard';
import { QuickStats } from '@/components/QuickStats';
import { EquipmentCard } from '@/components/EquipmentCard';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Calendar, Award, Heart, Zap } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import type { Equipment, Exercise } from '@/types/database';

export default function ActivityScreen() {
  const { user } = useAuth();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [activityData, setActivityData] = useState({
    calories_burned: 0,
    exercise_minutes: 0,
    steps: 0,
    calorie_goal: 600,
    exercise_goal: 30,
    stand_goal: 12,
    stand_hours: 0,
  });

  useEffect(() => {
    if (user) {
      fetchEquipment();
      fetchExercises();
      fetchTodayActivity();
    }
  }, [user]);

  async function fetchTodayActivity() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('daily_activities')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setActivityData({
          calories_burned: data.calories_burned || 0,
          exercise_minutes: data.exercise_minutes || 0,
          steps: data.steps || 0,
          calorie_goal: data.calorie_goal || 600,
          exercise_goal: data.exercise_goal || 30,
          stand_goal: data.stand_goal || 12,
          stand_hours: data.stand_hours || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching today activity:', error);
    }
  }

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
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExercises(data || []);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  }

  const ringsData = {
    move: { current: activityData.calories_burned, goal: activityData.calorie_goal },
    exercise: { current: activityData.exercise_minutes, goal: activityData.exercise_goal },
    stand: { current: activityData.stand_hours, goal: activityData.stand_goal },
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1C1C1E', '#2C2C2E']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>One O One Fitness</Text>
            <Text style={styles.subtitle}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>

          <View style={styles.ringsContainer}>
            <ActivityRings data={ringsData} size={200} />
            <View style={styles.ringsText}>
              <Text style={styles.ringsTitle}>Today's Activity</Text>
              <Text style={styles.ringsSubtitle}>Keep moving!</Text>
            </View>
          </View>

          <QuickStats data={activityData} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Equipment</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {equipment.map((item, index) => (
                <EquipmentCard key={index} equipment={item} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Exercises</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {exercises.map((item, index) => (
                <ExerciseCard key={index} exercise={item} />
              ))}
            </ScrollView>
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
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  ringsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ringsText: {
    alignItems: 'center',
    marginTop: 16,
  },
  ringsTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  ringsSubtitle: {
    fontSize: 16,
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
});