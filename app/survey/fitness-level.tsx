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
import { ArrowLeft, User, Users, Crown } from 'lucide-react-native';

export default function FitnessLevelScreen() {
  const [selectedLevel, setSelectedLevel] = useState('');

  const fitnessLevels = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'New to fitness or getting back into it',
      details: 'Perfect for those just starting their fitness journey',
      icon: <User size={32} color="#FFFFFF" />,
      gradient: ['#4ECDC4', '#44A08D'],
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'Regular exercise routine for 6+ months',
      details: 'You have some experience and want to level up',
      icon: <Users size={32} color="#FFFFFF" />,
      gradient: ['#FFD93D', '#FF6B35'],
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Consistent training for 2+ years',
      details: 'You\'re experienced and ready for challenges',
      icon: <Crown size={32} color="#FFFFFF" />,
      gradient: ['#FF6B6B', '#C44569'],
    },
  ];

  const handleContinue = () => {
    if (!selectedLevel) {
      Alert.alert('Error', 'Please select your fitness level');
      return;
    }

    // Store data in context or AsyncStorage
    router.push('/survey/workout-frequency');
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
          <Text style={styles.stepText}>Step 3 of 8</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '37.5%' }]} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            WHAT'S YOUR{'\n'}
            FITNESS LEVEL?
          </Text>

          <Text style={styles.subtitle}>
            This helps us recommend the right intensity and difficulty for your workouts.
          </Text>

          <View style={styles.levelsContainer}>
            {fitnessLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.levelCard,
                  selectedLevel === level.id && styles.levelCardSelected,
                ]}
                onPress={() => setSelectedLevel(level.id)}
              >
                <LinearGradient
                  colors={selectedLevel === level.id ? level.gradient : ['#FFFFFF', '#FFFFFF']}
                  style={styles.levelGradient}
                >
                  <View style={styles.levelHeader}>
                    <View style={[
                      styles.levelIcon,
                      selectedLevel !== level.id && styles.levelIconUnselected,
                    ]}>
                      {level.icon}
                    </View>
                    
                    <View style={[
                      styles.radio,
                      selectedLevel === level.id && styles.radioSelected,
                    ]}>
                      {selectedLevel === level.id && (
                        <View style={styles.radioDot} />
                      )}
                    </View>
                  </View>

                  <Text style={[
                    styles.levelTitle,
                    selectedLevel !== level.id && styles.levelTitleUnselected,
                  ]}>
                    {level.title}
                  </Text>
                  
                  <Text style={[
                    styles.levelDescription,
                    selectedLevel !== level.id && styles.levelDescriptionUnselected,
                  ]}>
                    {level.description}
                  </Text>
                  
                  <Text style={[
                    styles.levelDetails,
                    selectedLevel !== level.id && styles.levelDetailsUnselected,
                  ]}>
                    {level.details}
                  </Text>
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
  levelsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  levelCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  levelCardSelected: {
    borderColor: 'transparent',
  },
  levelGradient: {
    padding: 24,
    position: 'relative',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelIconUnselected: {
    backgroundColor: '#F8F9FA',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: '#FFFFFF',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
  },
  levelTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  levelTitleUnselected: {
    color: '#1A1A1A',
  },
  levelDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF90',
    marginBottom: 8,
  },
  levelDescriptionUnselected: {
    color: '#666',
  },
  levelDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF70',
    lineHeight: 20,
  },
  levelDetailsUnselected: {
    color: '#999',
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