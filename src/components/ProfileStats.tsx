import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ProfileStatsProps {
  data: {
    totalWorkouts: number;
    totalCalories: number;
    currentStreak: number;
    longestStreak: number;
  };
}

const ProfileStats: React.FC<ProfileStatsProps> = ({data}) => {
  const stats = [
    {
      label: 'Total Workouts',
      value: data.totalWorkouts.toString(),
      icon: '💪',
    },
    {
      label: 'Calories Burned',
      value: `${(data.totalCalories / 1000).toFixed(1)}k`,
      icon: '🔥',
    },
    {
      label: 'Current Streak',
      value: `${data.currentStreak} days`,
      icon: '⚡',
    },
    {
      label: 'Longest Streak',
      value: `${data.longestStreak} days`,
      icon: '🏆',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Stats</Text>
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

export default ProfileStats;