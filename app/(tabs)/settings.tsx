import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bell, 
  Shield, 
  HelpCircle, 
  FileText, 
  LogOut, 
  ChevronRight,
  Moon,
  Globe,
  Smartphone,
  Mail
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/auth/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        {
          icon: <Bell size={20} color="#FF6B35" />,
          title: 'Notifications',
          subtitle: 'Workout reminders, achievements',
          hasArrow: true,
        },
        {
          icon: <Moon size={20} color="#6C5CE7" />,
          title: 'Dark Mode',
          subtitle: 'Always on',
          hasArrow: true,
        },
        {
          icon: <Globe size={20} color="#4ECDC4" />,
          title: 'Language',
          subtitle: 'English',
          hasArrow: true,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: <Shield size={20} color="#FFD93D" />,
          title: 'Privacy & Security',
          subtitle: 'Data protection, account security',
          hasArrow: true,
        },
        {
          icon: <Smartphone size={20} color="#FF6B6B" />,
          title: 'Connected Devices',
          subtitle: 'Fitness trackers, smartwatches',
          hasArrow: true,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle size={20} color="#44A08D" />,
          title: 'Help & Support',
          subtitle: 'FAQs, contact us',
          hasArrow: true,
        },
        {
          icon: <Mail size={20} color="#A29BFE" />,
          title: 'Contact Support',
          subtitle: 'Get help from our team',
          hasArrow: true,
        },
        {
          icon: <FileText size={20} color="#F7931E" />,
          title: 'Terms & Privacy',
          subtitle: 'Legal information',
          hasArrow: true,
        },
      ],
    },
  ];

  const renderSettingItem = (item, index, isLast) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.settingItem,
        !isLast && styles.settingItemBorder,
      ]}
    >
      <View style={styles.settingItemLeft}>
        <View style={styles.settingIcon}>
          {item.icon}
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      {item.hasArrow && (
        <ChevronRight size={20} color="#666" />
      )}
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
            <Text style={styles.title}>Settings</Text>
          </View>

          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.settingsGroup}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <View style={styles.groupCard}>
                {group.items.map((item, itemIndex) =>
                  renderSettingItem(item, itemIndex, itemIndex === group.items.length - 1)
                )}
              </View>
            </View>
          ))}

          <View style={styles.appInfoSection}>
            <View style={styles.appInfoCard}>
              <Text style={styles.appName}>One O One Fitness</Text>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
              <Text style={styles.appDescription}>
                Your personal fitness companion for achieving your health goals.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <LinearGradient
              colors={['#FF6B6B', '#C44569']}
              style={styles.signOutGradient}
            >
              <LogOut size={20} color="#FFFFFF" />
              <Text style={styles.signOutText}>Sign Out</Text>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  settingsGroup: {
    marginBottom: 32,
  },
  groupTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  groupCard: {
    backgroundColor: '#2A2A2A',
    marginHorizontal: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3A3A3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF60',
  },
  appInfoSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  appInfoCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF80',
    textAlign: 'center',
    lineHeight: 20,
  },
  signOutButton: {
    marginHorizontal: 24,
    marginBottom: 100,
    borderRadius: 16,
    overflow: 'hidden',
  },
  signOutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});