import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { Exercise } from '@/types/database';
import { Dumbbell } from 'lucide-react-native';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress?: () => void;
}

export function ExerciseCard({ exercise, onPress }: ExerciseCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {exercise.thumbnail_url ? (
        <Image 
          source={{ uri: exercise.thumbnail_url }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Dumbbell size={32} color="#8E8E93" />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <View style={styles.tags}>
          <Text style={styles.tag}>{exercise.muscle_group}</Text>
          <Text style={[styles.tag, styles.difficultyTag(exercise.difficulty)]}>
            {exercise.difficulty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    width: 200,
    marginRight: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  placeholderImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#3C3C3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    backgroundColor: '#3C3C3E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyTag: (difficulty: string) => ({
    backgroundColor: 
      difficulty.toLowerCase() === 'beginner' ? '#4ECDC4' :
      difficulty.toLowerCase() === 'intermediate' ? '#FFD93D' :
      '#FF6B6B',
  }),
}); 