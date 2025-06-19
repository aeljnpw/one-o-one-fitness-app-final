import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileStats } from '@/components/ProfileStats';
import { Settings, Edit3, Share2, Bell, Shield, HelpCircle, LogOut } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchProfile();
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

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const menuItems = [
    { icon: <Edit3 size={20} color="#8E8E93" />, title: 'Edit Profile', hasArrow: true },
    { icon: <Bell size={20} color="#8E8E93" />, title: 'Notifications', hasArrow: true },
    { icon: <Shield size={20} color="#8E8E93" />, title: 'Privacy & Security', hasArrow: true },
    { icon: <Share2 size={20} color="#8E8E93" />, title: 'Share App', hasArrow: true },
    { icon: <HelpCircle size={20} color="#8E8E93" />, title: 'Help & Support', hasArrow: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1C1C1E', '#2C2C2E']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          {profile && (
            <>
              <View style={styles.profileCard}>
                <LinearGradient colors={['#FF6B6B', '#FF8E8E']} style={styles.profileGradient}>
                  <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatar}>{profile.avatar_url || '👤'}</Text>
                    </View>
                    <View style={styles.profileInfo}>
                      <Text style={styles.profileName}>{profile.name}</Text>
                      <Text style={styles.profileLevel}>{profile.level || 'Beginner'}</Text>
                      <Text style={styles.profileJoinDate}>
                        Member since {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              <ProfileStats data={{
                totalWorkouts: profile.workouts_completed || 0,
                totalCalories: profile.total_calories || 0,
                currentStreak: profile.current_streak || 0,
                longestStreak: profile.longest_streak || 0,
              }} />
            </>
          )}

          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  {item.icon}
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                {item.hasArrow && <Text style={styles.menuItemArrow}>›</Text>}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <LogOut size={20} color="#FF3B30" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>One O One Fitness v1.0.0</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    margin: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 40,
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
  menuSection: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    margin: 24,
    marginTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF10',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#8E8E93',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 16,
    margin: 24,
    marginTop: 0,
    gap: 8,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FF3B30',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
});