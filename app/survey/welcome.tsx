import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, Target, Zap, Trophy } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B35', '#F7931E', '#FFD23F']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Let's Get Started!</Text>
            <Text style={styles.subtitle}>
              We'll create a personalized fitness plan just for you
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Target size={32} color="#FF6B35" />
              </View>
              <Text style={styles.featureTitle}>Personalized Goals</Text>
              <Text style={styles.featureDescription}>
                Tailored workouts based on your fitness objectives
              </Text>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Zap size={32} color="#F7931E" />
              </View>
              <Text style={styles.featureTitle}>Smart Tracking</Text>
              <Text style={styles.featureDescription}>
                Monitor your progress with detailed analytics
              </Text>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Trophy size={32} color="#FFD23F" />
              </View>
              <Text style={styles.featureTitle}>Achievements</Text>
              <Text style={styles.featureDescription}>
                Unlock badges and celebrate your milestones
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/survey/personal-info')}
          >
            <LinearGradient
              colors={['#1A1A1A', '#2A2A2A']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Start Survey</Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            This will only take 2-3 minutes
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF90',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 48,
  },
  feature: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
  disclaimer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF70',
    textAlign: 'center',
  },
});