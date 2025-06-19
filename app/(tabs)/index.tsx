import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityRings } from '@/components/ActivityRings';
import { ActivityCard } from '@/components/ActivityCard';
import { QuickStats } from '@/components/QuickStats';
import { Calendar, Award, Heart, Zap } from 'lucide-react-native';

export default function ActivityScreen() {
  const todayData = {
    move: { current: 420, goal: 600 },
    exercise: { current: 28, goal: 30 },
    stand: { current: 8, goal: 12 },
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1C1C1E', '#2C2C2E']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>One O One Fitness</Text>
            <Text style={styles.subtitle}>Friday, January 12</Text>
          </View>

          <View style={styles.ringsContainer}>
            <ActivityRings data={todayData} size={200} />
            <View style={styles.ringsText}>
              <Text style={styles.ringsTitle}>Today's Activity</Text>
              <Text style={styles.ringsSubtitle}>Great progress today!</Text>
            </View>
          </View>

          <QuickStats />

          <View style={styles.cardsContainer}>
            <ActivityCard
              icon={<Calendar size={24} color="#FF6B6B" />}
              title="Weekly Summary"
              subtitle="Review your week"
              gradient={['#FF6B6B', '#FF8E8E']}
            />
            
            <ActivityCard
              icon={<Award size={24} color="#4ECDC4" />}
              title="Achievements"
              subtitle="3 new badges earned"
              gradient={['#4ECDC4', '#6EE7DB']}
            />

            <ActivityCard
              icon={<Heart size={24} color="#FF9FF3" />}
              title="Heart Rate"
              subtitle="Avg 142 BPM today"
              gradient={['#FF9FF3', '#FFB3F5']}
            />

            <ActivityCard
              icon={<Zap size={24} color="#FFD93D" />}
              title="Energy"
              subtitle="High energy level"
              gradient={['#FFD93D', '#FFE066']}
            />
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
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  ringsContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  ringsText: {
    marginTop: 20,
    alignItems: 'center',
  },
  ringsTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  ringsSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    paddingBottom: 100,
  },
});