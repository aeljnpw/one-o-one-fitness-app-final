import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface StatCardProps {
  stat: {
    title: string;
    value: string;
    unit: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ReactNode;
    gradient: string[];
  };
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <LinearGradient colors={stat.gradient} style={styles.gradient}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            {stat.icon}
          </View>
          <View style={styles.trendContainer}>
            {stat.trend === 'up' ? (
              <TrendingUp size={16} color="#FFFFFF" />
            ) : (
              <TrendingDown size={16} color="#FFFFFF" />
            )}
            <Text style={styles.changeText}>{stat.change}</Text>
          </View>
        </View>
        <Text style={styles.title}>{stat.title}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.unit}>{stat.unit}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    minHeight: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  value: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  unit: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});