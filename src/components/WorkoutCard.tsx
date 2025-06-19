import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface WorkoutCardProps {
  workout: {
    id: number;
    type: string;
    duration: string;
    calories: number;
    date: string;
    icon: string;
    gradient: string[];
  };
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({workout}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <LinearGradient colors={workout.gradient} style={styles.gradient}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{workout.icon}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.type}>{workout.type}</Text>
            <Text style={styles.date}>{workout.date}</Text>
          </View>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Icon name="schedule" size={16} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.statText}>{workout.duration}</Text>
            </View>
            <View style={styles.stat}>
              <Icon
                name="local-fire-department"
                size={16}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text style={styles.statText}>{workout.calories} cal</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  type: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default WorkoutCard;