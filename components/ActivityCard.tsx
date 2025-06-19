import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Flame, Footprints } from 'lucide-react-native';

interface ActivityCardProps {
  date: string;
  calories: number;
  duration: number;
  steps: number;
}

export function ActivityCard({ date, calories, duration, steps }: ActivityCardProps) {
  return (
    <LinearGradient colors={['#2C2C2E', '#3C3C3E']} style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Flame size={20} color="#FF6B6B" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Clock size={20} color="#4ECDC4" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{Math.floor(duration / 60)}h {duration % 60}m</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Footprints size={20} color="#45B7D1" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{steps.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
  },
  dateContainer: {
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
});