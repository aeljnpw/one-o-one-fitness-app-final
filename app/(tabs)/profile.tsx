import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard as Edit3, Camera, Trophy, Target, Zap, Calendar } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    currentStreak: 0,
    longestStreak: 0,
    memberSince: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async function fetchStats() {
    try {
      // Fetch workout stats
      const { data: activities, error } = await supabase
        .from('daily_activities')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const totalWorkouts = activities.length;
      const totalCalories = activities.reduce((sum, activity) => sum + (activity.calories_burned || 0), 0);
      
      setStats({
        totalWorkouts,
        totalCalories,
        currentStreak: 5, // Placeholder
        longestStreak: 12, // Placeholder
        memberSince: new Date(user.created_at).toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        }),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#1A1A1A', '#2A2A2A']} style={styles.gradient}>
          <Text style={styles.loadingText}>Loading...</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileCard}>
            <LinearGradient
              colors={['#FF6B35', '#F7931E', '#FFD23F']}
              style={styles.profileGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {profile.name ? profile.name.charAt(0).toUpperCase() : '👤'}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.cameraButton}>
                    <Camera size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profile.name || 'User'}</Text>
                  <Text style={styles.profileLevel}>{profile.level || 'Beginner'}</Text>
                  <Text style={styles.profileJoinDate}>
                    Member since {stats.memberSince}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#6C5CE7', '#A29BFE']}
                style={styles.statGradient}
              >
                <Trophy size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
                <Text style={styles.statLabel}>Total Workouts</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.statGradient}
              >
                <Zap size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{(stats.totalCalories / 1000).toFixed(1)}k</Text>
                <Text style={styles.statLabel}>Calories Burned</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.statGradient}
              >
                <Target size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{stats.currentStreak}</Text>
                <Text style={styles.statLabel}>Current Streak</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FFD93D', '#FF6B35']}
                style={styles.statGradient}
              >
                <Calendar size={24} color="#FFFFFF" />
                <Text style={styles.statValue}>{stats.longestStreak}</Text>
                <Text style={styles.statLabel}>Longest Streak</Text>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.personalInfoSection}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{profile.email || user.email}</Text>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Fitness Goal</Text>
                <Text style={styles.infoValue}>Weight Loss</Text>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Fitness Level</Text>
                <Text style={styles.infoValue}>Intermediate</Text>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Weekly Goal</Text>
                <Text style={styles.infoValue}>4 workouts</Text>
              </View>
            </View>
          </View>

          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            
            <View style={styles.achievementsList}>
              <View style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🎯</Text>
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>First Workout</Text>
                  <Text style={styles.achievementDate}>2 days ago</Text>
                </View>
              </View>

              <View style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🔥</Text>
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>5 Day Streak</Text>
                  <Text style={styles.achievementDate}>1 day ago</Text>
                </View>
              </View>

              <View style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>💪</Text>
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>100 Calories</Text>
                  <Text style={styles.achievementDate}>Today</Text>
                </View>
              </View>
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
    backgroundColor: '#1A1A1A',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
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
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
  },
  profileGradient: {
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileLevel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF90',
    marginBottom: 4,
  },
  profileJoinDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF70',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 16,
  },
  statCard: {
    width: (width - 64) / 2,
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
    textAlign: 'center',
  },
  personalInfoSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF80',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#3A3A3A',
  },
  achievementsSection: {
    paddingHorizontal: 24,
    marginBottom: 100,
  },
  achievementsList: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 20,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3A3A3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementEmoji: {
    fontSize: 20,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF60',
  },
});