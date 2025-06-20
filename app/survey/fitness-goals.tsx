import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Target, Zap, Heart, TrendingUp } from 'lucide-react-native';

export default function FitnessGoalsScreen() {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const fitnessGoals = [
    {
      id: 'weight_loss',
      title: 'Weight Loss',
      description: 'Burn calories and lose weight',
      icon: <Target size={32} color="#FFFFFF" />,
      gradient: ['#FF6B6B', '#C44569'],
    },
    {
      id: 'muscle_gain',
      title: 'Muscle Gain',
      description: 'Build strength and muscle mass',
      icon: <Zap size={32} color="#FFFFFF" />,
      gradient: ['#6C5CE7', '#A29BFE'],
    },
    {
      id: 'endurance',
      title: 'Endurance',
      description: 'Improve cardiovascular fitness',
      icon: <Heart size={32} color="#FFFFFF" />,
      gradient: ['#4ECDC4', '#44A08D'],
    },
    {
      id: 'general_fitness',
      title: 'General Fitness',
      description: 'Overall health and wellness',
      icon: <TrendingUp size={32} color="#FFFFFF" />,
      gradient: ['#FFD93D', '#FF6B35'],
    },
  ];

  const toggleGoal = (goalId) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length === 0) {
      Alert.alert('Error', 'Please select at least one fitness goal');
      return;
    }

    // Store data in context or AsyncStorage
    router.push('/survey/fitness-level');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 2 of 8</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '25%' }]} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            WHAT ARE YOUR{'\n'}
            FITNESS GOALS?
          </Text>

          <Text style={styles.subtitle}>
            Select all that apply. We'll customize your workout plan based on your goals.
          </Text>

          <View style={styles.goalsContainer}>
            {fitnessGoals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  selectedGoals.includes(goal.id) && styles.goalCardSelected,
                ]}
                onPress={() => toggleGoal(goal.id)}
              >
                <LinearGradient
                  colors={selectedGoals.includes(goal.id) ? goal.gradient : ['#FFFFFF', '#FFFFFF']}
                  style={styles.goalGradient}
                >
                  <View style={[
                    styles.goalIcon,
                    !selectedGoals.includes(goal.id) && styles.goalIconUnselected,
                  ]}>
                    {goal.icon}
                  </View>
                  <Text style={[
                    styles.goalTitle,
                    !selectedGoals.includes(goal.id) && styles.goalTitleUnselected,
                  ]}>
                    {goal.title}
                  </Text>
                  <Text style={[
                    styles.goalDescription,
                    !selectedGoals.includes(goal.id) && styles.goalDescriptionUnselected,
                  ]}>
                    {goal.description}
                  </Text>
                  
                  <View style={[
                    styles.checkbox,
                    selectedGoals.includes(goal.id) && styles.checkboxSelected,
                  ]}>
                    {selectedGoals.includes(goal.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E9ECEF',
    marginHorizontal: 24,
    borderRadius: 2,
    marginBottom: 32,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 32,
    lineHeight: 24,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  goalCard: {
    width: '47%',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  goalCardSelected: {
    borderColor: 'transparent',
  },
  goalGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
    position: 'relative',
  },
  goalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  goalIconUnselected: {
    backgroundColor: '#F8F9FA',
  },
  goalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  goalTitleUnselected: {
    color: '#1A1A1A',
  },
  goalDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF80',
    textAlign: 'center',
    lineHeight: 16,
  },
  goalDescriptionUnselected: {
    color: '#666',
  },
  checkbox: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  checkmark: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  continueButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginBottom: 32,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1,
  },
});