import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradient: string[];
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  icon,
  title,
  subtitle,
  gradient,
}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <LinearGradient colors={gradient} style={styles.gradient}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default ActivityCard;