import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Trophy, TrendingUp, Camera, Target, Zap, Award } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState([]);
  const [stats, setStats] = useState({
    totalCalories: 0,
    totalWorkouts: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProgressData();
      fetchAchievements();
    }
  }, [user]);

  async function fetchProgressData() {
    try {
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - 7));

      const { data: activities, error } = await supabase
        .from('daily_activities')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', weekStart.toISOString())
        .order('date', { ascending: true });

      if (error) throw error;

      const weeklyStats = activities.map(activity => ({
        day: new Date(activity.date).toLocaleDateString('en-US', { weekday: 'short' }),
        calories: activity.calories_burned || 0,
        exercises: Math.floor((activity.exercise_minutes || 0) / 10),
      }));

      setWeeklyData(weeklyStats);

      // Calculate total stats
      const totalCalories = activities.reduce((sum, activity) => sum + (activity.calories_burned || 0), 0);
      const totalWorkouts = activities.length;
      
      setStats({
        totalCalories,
        totalWorkouts,
        currentStreak: 5, // Placeholder
        longestStreak: 12, // Placeholder
      });
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  }

  async function fetchAchievements() {
    // Mock achievements data
    setAchievements([
      { id: 1, title: 'First Workout', description: 'Complete your first workout', unlocked: true, icon: '🎯' },
      { id: 2, title: '7 Day Streak', description: 'Workout for 7 consecutive days', unlocked: true, icon: '🔥' },
      { id: 3, title: '100 Calories', description: 'Burn 100 calories in a single workout', unlocked: true, icon: '💪' },
      { id: 4, title: 'Early Bird', description: 'Complete a workout before 8 AM', unlocked: false, icon: '🌅' },
      { id: 5, title: 'Consistency King', description: 'Workout 30 days in a row', unlocked: false, icon: '👑' },
      { id: 6, title: 'Calorie Crusher', description: 'Burn 1000 calories in a week', unlocked: false, icon: '🚀' },
    ]);
  }

  const renderWeeklyChart = () => {
    const maxCalories = Math.max(...weeklyData.map(d => d.calories), 1);
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>This Week's Progress</Text>
        <View style={styles.chart}>
          {weeklyData.map((day, index) => (
            <View key={index} style={styles.chartDay}>
              <View style={styles.chartBar}>
                <View
                  style={[
                    styles.chartBarFill,
                    {
                      height: `${(day.calories / maxCalories) * 100}%`,
                      backgroundColor: day.calories > 0 ? '#FF6B35' : '#2A2A2A',
                    },
                  ]}
                />
              </View>
              <Text style={styles.chartDayLabel}>{day.day}</Text>
              <Text style={styles.chartDayValue}>{day.calories}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderAchievementCard = (achievement) => (
    <TouchableOpacity
      key={achievement.id}
      style={[
        styles.achievementCard,
        !achievement.unlocked && styles.achievementCardLocked,
      ]}
    >
      <LinearGradient
        colors={achievement.unlocked ? ['#FF6B35', '#F7931E'] : ['#2A2A2A', '#3A3A3A']}
        style={styles.achievementGradient}
      >
        <Text style={styles.achievementIcon}>{achievement.icon}</Text>
        <Text style={[
          styles.achievementTitle,
          !achievement.unlocked && styles.achievementTitleLocked,
        ]}>
          {achievement.title}
        </Text>
        <Text style={[
          styles.achievementDescription,
          !achievement.unlocked && styles.achievementDescriptionLocked,
        ]}>
          {achievement.description}
        </Text>
        {achievement.unlocked && (
          <View style={styles.unlockedBadge}>
            <Award size={12} color="#FFFFFF" />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Progress</Text>
            <TouchableOpacity style={styles.calendarButton}>
              <Calendar size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.statGradient}
              >
                <Zap size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{stats.totalCalories}</Text>
                <Text style={styles.statLabel}>Total Calories</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#6C5CE7', '#A29BFE']}
                style={styles.statGradient}
              >
                <Target size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.streakContainer}>
            <View style={styles.streakCard}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.streakGradient}
              >
                <View style={styles.streakHeader}>
                  <TrendingUp size={24} color="#FFFFFF" />
                  <Text style={styles.streakTitle}>Streak</Text>
                </View>
                <View style={styles.streakStats}>
                  <View style={styles.streakStat}>
                    <Text style={styles.streakValue}>{stats.currentStreak}</Text>
                    <Text style={styles.streakLabel}>Current</Text>
                  </View>
                  <View style={styles.streakDivider} />
                  <View style={styles.streakStat}>
                    <Text style={styles.streakValue}>{stats.longestStreak}</Text>
                    <Text style={styles.streakLabel}>Best</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>

          {renderWeeklyChart()}

          <View style={styles.achievementsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.achievementsList}
            >
              {achievements.map(renderAchievementCard)}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.photoButton}>
            <LinearGradient
              colors={['#FF6B6B', '#C44569']}
              style={styles.photoGradient}
            >
              <Camera size={24} color="#FFFFFF" />
              <Text style={styles.photoButtonText}>Add Progress Photo</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
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
  scrollView: {
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
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
    marginTop: 4,
  },
  streakContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  streakCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  streakGradient: {
    padding: 20,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  streakStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakStat: {
    alignItems: 'center',
    flex: 1,
  },
  streakValue: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  streakLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
    marginTop: 4,
  },
  streakDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#FFFFFF20',
    marginHorizontal: 20,
  },
  chartContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartDay: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    height: 80,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBarFill: {
    width: '100%',
    borderRadius: 10,
    minHeight: 4,
  },
  chartDayLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
    marginBottom: 4,
  },
  chartDayValue: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  achievementsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
  },
  achievementsList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  achievementCard: {
    width: 140,
    borderRadius: 16,
    overflow: 'hidden',
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
    position: 'relative',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#FFFFFF60',
  },
  achievementDescription: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF80',
    textAlign: 'center',
    lineHeight: 14,
  },
  achievementDescriptionLocked: {
    color: '#FFFFFF40',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoButton: {
    marginHorizontal: 24,
    marginBottom: 100,
    borderRadius: 16,
    overflow: 'hidden',
  },
  photoGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  photoButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});