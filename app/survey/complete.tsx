import React, { useEffect } from 'react';
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
import { CheckCircle, ArrowRight, Trophy, Target, Zap } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withDelay,
  withSequence
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function CompleteScreen() {
  const checkScale = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0);

  useEffect(() => {
    // Animate check mark
    checkScale.value = withDelay(300, withSpring(1));
    
    // Animate content
    contentOpacity.value = withDelay(600, withSpring(1));
    
    // Animate button
    buttonScale.value = withDelay(900, withSpring(1));
  }, []);

  const checkAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: checkScale.value }],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [{ translateY: (1 - contentOpacity.value) * 20 }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B35', '#F7931E', '#FFD23F']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Animated.View style={[styles.checkContainer, checkAnimatedStyle]}>
            <CheckCircle size={80} color="#FFFFFF" />
          </Animated.View>

          <Animated.View style={[styles.textContainer, contentAnimatedStyle]}>
            <Text style={styles.title}>You're All Set!</Text>
            <Text style={styles.subtitle}>
              Your personalized fitness plan is ready. Let's start your journey to a healthier you!
            </Text>
          </Animated.View>

          <Animated.View style={[styles.featuresContainer, contentAnimatedStyle]}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Target size={24} color="#FF6B35" />
              </View>
              <Text style={styles.featureTitle}>Personalized Workouts</Text>
              <Text style={styles.featureDescription}>
                Tailored to your fitness level and goals
              </Text>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Zap size={24} color="#F7931E" />
              </View>
              <Text style={styles.featureTitle}>Progress Tracking</Text>
              <Text style={styles.featureDescription}>
                Monitor your achievements and improvements
              </Text>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Trophy size={24} color="#FFD23F" />
              </View>
              <Text style={styles.featureTitle}>Achievements</Text>
              <Text style={styles.featureDescription}>
                Unlock badges and celebrate milestones
              </Text>
            </View>
          </Animated.View>

          <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
              <LinearGradient
                colors={['#1A1A1A', '#2A2A2A']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
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
    alignItems: 'center',
  },
  checkContainer: {
    marginBottom: 40,
  },
  textContainer: {
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
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 48,
  },
  feature: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
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
  buttonContainer: {
    width: '100%',
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
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
});