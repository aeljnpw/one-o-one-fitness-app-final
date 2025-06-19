import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityCard } from '@/components/ActivityCard';
import { TrendChart } from '@/components/TrendChart';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function TrendsScreen() {
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (user) {
      fetchActivityData();
    }
  }, [user]);

  async function fetchActivityData() {
    try {
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - 7));
      const monthStart = new Date(now.setDate(now.getDate() - 30));

      const { data: dailyActivities, error } = await supabase
        .from('daily_activities')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', monthStart.toISOString())
        .order('date', { ascending: true });

      if (error) throw error;

      // Process weekly data
      const weeklyStats = dailyActivities
        .filter(activity => new Date(activity.date) >= weekStart)
        .map(activity => ({
          date: new Date(activity.date).toLocaleDateString('en-US', { weekday: 'short' }),
          value: activity.calories_burned || 0,
        }));

      // Process monthly data
      const monthlyStats = dailyActivities.map(activity => ({
        date: new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: activity.calories_burned || 0,
      }));

      // Process recent activities
      const recentActivities = dailyActivities
        .slice(-5)
        .reverse()
        .map(activity => ({
          date: new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          calories: activity.calories_burned || 0,
          duration: activity.duration || 0,
          steps: activity.steps || 0,
        }));

      setWeeklyData(weeklyStats);
      setMonthlyData(monthlyStats);
      setActivities(recentActivities);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1C1C1E', '#2C2C2E']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Activity</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <TrendChart data={weeklyData} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Month</Text>
            <TrendChart data={monthlyData} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <View style={styles.activitiesContainer}>
              {activities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  date={activity.date}
                  calories={activity.calories}
                  duration={activity.duration}
                  steps={activity.steps}
                />
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
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
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
  activitiesContainer: {
    gap: 16,
  },
});