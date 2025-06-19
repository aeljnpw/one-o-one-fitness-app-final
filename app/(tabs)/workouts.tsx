import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WorkoutCard } from '@/components/WorkoutCard';
import { Plus, Clock, Calendar } from 'lucide-react-native';

export default function WorkoutsScreen() {
  const recentWorkouts = [
    {
      id: 1,
      type: 'Running',
      duration: '45 min',
      calories: 420,
      date: 'Today',
      icon: '🏃‍♂️',
      gradient: ['#FF6B6B', '#FF8E8E'],
    },
    {
      id: 2,
      type: 'Strength Training',
      duration: '60 min',
      calories: 380,
      date: 'Yesterday',
      icon: '💪',
      gradient: ['#4ECDC4', '#6EE7DB'],
    },
    {
      id: 3,
      type: 'Yoga',
      duration: '30 min',
      calories: 150,
      date: '2 days ago',
      icon: '🧘‍♀️',
      gradient: ['#A8E6CF', '#DCEDC8'],
    },
    {
      id: 4,
      type: 'Cycling',
      duration: '90 min',
      calories: 650,
      date: '3 days ago',
      icon: '🚴‍♂️',
      gradient: ['#FFD93D', '#FFE066'],
    },
  ];

  const workoutTypes = [
    { name: 'Running', icon: '🏃‍♂️', color: '#FF6B6B' },
    { name: 'Cycling', icon: '🚴‍♂️', color: '#4ECDC4' },
    { name: 'Swimming', icon: '🏊‍♂️', color: '#45B7D1' },
    { name: 'Strength', icon: '💪', color: '#A8E6CF' },
    { name: 'Yoga', icon: '🧘‍♀️', color: '#FFD93D' },
    { name: 'Dancing', icon: '💃', color: '#FF9FF3' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1C1C1E', '#2C2C2E']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Workouts</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Clock size={20} color="#FF6B6B" />
              <Text style={styles.statValue}>3h 45m</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statItem}>
              <Calendar size={20} color="#4ECDC4" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statValue}>2,340</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Start</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickStartScroll}>
              {workoutTypes.map((workout, index) => (
                <TouchableOpacity key={index} style={[styles.quickStartItem, { backgroundColor: workout.color + '20' }]}>
                  <Text style={styles.quickStartIcon}>{workout.icon}</Text>
                  <Text style={styles.quickStartText}>{workout.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            <View style={styles.workoutsContainer}>
              {recentWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  quickStartScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  quickStartItem: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickStartIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  quickStartText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  workoutsContainer: {
    gap: 12,
  },
});