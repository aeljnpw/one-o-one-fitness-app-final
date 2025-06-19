import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Share2 } from 'lucide-react-native';

interface ShareCardProps {
  achievement: {
    id: number;
    title: string;
    description: string;
    icon: string;
    date: string;
    gradient: string[];
  };
}

export function ShareCard({ achievement }: ShareCardProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <LinearGradient colors={achievement.gradient} style={styles.gradient}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{achievement.icon}</Text>
            </View>
            <TouchableOpacity style={styles.shareButton}>
              <Share2 size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{achievement.title}</Text>
          <Text style={styles.description}>{achievement.description}</Text>
          <Text style={styles.date}>{achievement.date}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  shareButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});