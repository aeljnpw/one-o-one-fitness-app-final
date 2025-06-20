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
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard as Edit3, Camera, Trophy, Target, Zap, Calendar, X, Save } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [personalRecords, setPersonalRecords] = useState([
    { exercise: 'Push-ups', record: '50 reps', date: '2 days ago' },
    { exercise: 'Plank', record: '2:30 min', date: '1 week ago' },
    { exercise: 'Squats', record: '100 reps', date: '3 days ago' },
  ]);

  const modalScale = useSharedValue(0);

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
      setEditedProfile(data);
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

  function openEditModal() {
    setShowEditModal(true);
    modalScale.value = withSpring(1);
  }

  function closeEditModal() {
    modalScale.value = withSpring(0, {}, () => {
      setShowEditModal(false);
      setEditedProfile(profile);
    });
  }

  async function saveProfile() {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(editedProfile)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(editedProfile);
      closeEditModal();
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  }

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: modalScale.value }],
      opacity: modalScale.value,
    };
  });

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
            <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
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
                <Text style={styles.infoLabel}>Age</Text>
                <Text style={styles.infoValue}>{profile.age || 'Not set'}</Text>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Height</Text>
                <Text style={styles.infoValue}>{profile.height ? `${profile.height} cm` : 'Not set'}</Text>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Weight</Text>
                <Text style={styles.infoValue}>{profile.weight ? `${profile.weight} kg` : 'Not set'}</Text>
              </View>

              <View style={styles.infoDivider} />
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Fitness Level</Text>
                <Text style={styles.infoValue}>{profile.fitness_level || 'Not set'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.personalRecordsSection}>
            <Text style={styles.sectionTitle}>Personal Records</Text>
            
            <View style={styles.recordsList}>
              {personalRecords.map((record, index) => (
                <View key={index} style={styles.recordItem}>
                  <View style={styles.recordIcon}>
                    <Text style={styles.recordEmoji}>🏆</Text>
                  </View>
                  <View style={styles.recordContent}>
                    <Text style={styles.recordExercise}>{record.exercise}</Text>
                    <Text style={styles.recordValue}>{record.record}</Text>
                  </View>
                  <Text style={styles.recordDate}>{record.date}</Text>
                </View>
              ))}
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

        <Modal
          visible={showEditModal}
          transparent
          animationType="fade"
          onRequestClose={closeEditModal}
        >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, modalAnimatedStyle]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={closeEditModal}>
                  <X size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalBody}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProfile.name || ''}
                    onChangeText={(text) => setEditedProfile(prev => ({ ...prev, name: text }))}
                    placeholder="Enter your name"
                    placeholderTextColor="#666"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Bio</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={editedProfile.bio || ''}
                    onChangeText={(text) => setEditedProfile(prev => ({ ...prev, bio: text }))}
                    placeholder="Tell us about yourself"
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Age</Text>
                    <TextInput
                      style={styles.input}
                      value={editedProfile.age?.toString() || ''}
                      onChangeText={(text) => setEditedProfile(prev => ({ ...prev, age: parseInt(text) || null }))}
                      placeholder="25"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Height (cm)</Text>
                    <TextInput
                      style={styles.input}
                      value={editedProfile.height?.toString() || ''}
                      onChangeText={(text) => setEditedProfile(prev => ({ ...prev, height: parseInt(text) || null }))}
                      placeholder="170"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    value={editedProfile.weight?.toString() || ''}
                    onChangeText={(text) => setEditedProfile(prev => ({ ...prev, weight: parseInt(text) || null }))}
                    placeholder="70"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                  />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                  <LinearGradient
                    colors={['#FF6B35', '#F7931E']}
                    style={styles.saveGradient}
                  >
                    <Save size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </View>
        </Modal>
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
  personalRecordsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  recordsList: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 20,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3A3A3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  recordEmoji: {
    fontSize: 20,
  },
  recordContent: {
    flex: 1,
  },
  recordExercise: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  recordValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
  },
  recordDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF60',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#2A2A2A',
    borderRadius: 24,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    flex: 1,
  },
  modalBody: {
    padding: 24,
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#3A3A3A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});