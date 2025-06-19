import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TrendChart from '../components/TrendChart';
import StatCard from '../components/StatCard';

const TrendsScreen = () => {
  const weeklyData = [
    {day: 'Mon', move: 450, exercise: 25, stand: 10},
    {day: 'Tue', move: 380, exercise: 30, stand: 8},
    {day: 'Wed', move: 520, exercise: 45, stand: 12},
    {day: 'Thu', move: 420, exercise: 28, stand: 9},
    {day: 'Fri', move: 600, exercise: 35, stand: 11},
    {day: 'Sat', move: 480, exercise: 40, stand: 10},
    {day: 'Sun', move: 350, exercise: 20, stand: 8},
  ];

  const monthlyStats = [
    {
      title: 'Average Move',
      value: '465',
      unit: 'cal',
      change: '+12%',
      trend: 'up',
      icon: <Icon name="trending-up" size={20} color="#FF6B6B" />,
      gradient: ['#FF6B6B', '#FF8E8E'],
    },
    {
      title: 'Exercise Minutes',
      value: '210',
      unit: 'min',
      change: '+8%',
      trend: 'up',
      icon: <Icon name="fitness-center" size={20} color="#4ECDC4" />,
      gradient: ['#4ECDC4', '#6EE7DB'],
    },
    {
      title: 'Stand Hours',
      value: '68',
      unit: 'hrs',
      change: '+5%',
      trend: 'up',
      icon: <Icon name="calendar-today" size={20} color="#45B7D1" />,
      gradient: ['#45B7D1', '#74C2E1'],
    },
    {
      title: 'Perfect Days',
      value: '18',
      unit: 'days',
      change: '+22%',
      trend: 'up',
      icon: <Icon name="emoji-events" size={20} color="#A8E6CF" />,
      gradient: ['#A8E6CF', '#DCEDC8'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1C1C1E', '#2C2C2E']} style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Trends</Text>
            <Text style={styles.subtitle}>Your fitness journey</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <TrendChart data={weeklyData} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Monthly Overview</Text>
            <View style={styles.statsGrid}>
              {monthlyStats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Insights</Text>
            <View style={styles.insightsContainer}>
              <View style={styles.insightCard}>
                <Text style={styles.insightTitle}>🔥 Streak</Text>
                <Text style={styles.insightValue}>7 days</Text>
                <Text style={styles.insightDescription}>
                  You're on a perfect week! Keep up the momentum.
                </Text>
              </View>

              <View style={styles.insightCard}>
                <Text style={styles.insightTitle}>⭐ Best Day</Text>
                <Text style={styles.insightValue}>Friday</Text>
                <Text style={styles.insightDescription}>
                  You're most active on Fridays with 600 cal average.
                </Text>
              </View>

              <View style={styles.insightCard}>
                <Text style={styles.insightTitle}>📈 Progress</Text>
                <Text style={styles.insightValue}>+15%</Text>
                <Text style={styles.insightDescription}>
                  Your activity has increased 15% this month.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

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
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
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
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
});

export default TrendsScreen;