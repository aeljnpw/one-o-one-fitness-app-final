import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame, Clock, Footprints } from 'lucide-react-native';

interface QuickStatsProps {
  data: {
    calories_burned: number;
    exercise_minutes: number;
    steps: number;
  };
}

export function QuickStats({ data }: QuickStatsProps) {
  const stats = [
    { 
      icon: <Flame size={20} color="#FF6B6B" />, 
      value: data.calories_burned.toString(), 
      label: 'Calories', 
      unit: 'cal' 
    },
    { 
      icon: <Clock size={20} color="#4ECDC4" />, 
      value: data.exercise_minutes.toString(), 
      label: 'Exercise', 
      unit: 'min' 
    },
    { 
      icon: <Footprints size={20} color="#45B7D1" />, 
      value: data.steps.toString(), 
      label: 'Steps', 
      unit: '' 
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <View style={styles.statIcon}>
            {stat.icon}
          </View>
          <Text style={styles.statValue}>
            {stat.value}
            <Text style={styles.statUnit}>{stat.unit}</Text>
          </Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3C3C3E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statUnit: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginLeft: 2,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginTop: 4,
  },
});