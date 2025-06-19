import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileStats } from '@/components/ProfileStats';
import { Settings, Edit3, Share2, Bell, Shield, HelpCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const profileData = {
    name: 'Alex Thompson',
    avatar: '👨‍💻',
    level: 'Fitness Enthusiast',
    joinDate: 'January 2024',
    totalWorkouts: 127,
    totalCalories: 45230,
    currentStreak: 12,
    longestStreak: 28,
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
      <LinearGradient
        colors={['#1C1C1E', '#2C2C2E']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileCard}>
            <LinearGradient
              colors={['#FF6B6B', '#FF8E8E']}
              style={styles.profileGradient}
            >
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatar}>{profileData.avatar}</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profileData.name}</Text>
                  <Text style={styles.profileLevel}>{profileData.level}</Text>
                  <Text style={styles.profileJoinDate}>Member since {profileData.joinDate}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <ProfileStats data={profileData} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>🏆</Text>
                <Text style={styles.achievementName}>Perfect Week</Text>
              </View>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>🔥</Text>
                <Text style={styles.achievementName}>12 Day Streak</Text>
              </View>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>⭐</Text>
                <Text style={styles.achievementName}>Goal Crusher</Text>
              </View>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>💪</Text>
                <Text style={styles.achievementName}>Strong Finish</Text>
              </View>
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.menuContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={styles.menuTitle}>{item.title}</Text>
                  </View>
                  {item.hasArrow && (
                    <Text style={styles.menuArrow}>›</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>Sign Out</Text>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    marginBottom: 30,
    borderRadius: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
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
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  profileJoinDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  achievementsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  achievementItem: {
    width: 100,
    height: 100,
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#3C3C3E',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  menuArrow: {
    fontSize: 20,
    color: '#8E8E93',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FF3B30',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
});