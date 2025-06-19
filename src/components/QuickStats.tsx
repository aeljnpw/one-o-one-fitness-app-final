import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuickStats: React.FC = () => {
  const stats = [
    {
      icon: <Icon name="local-fire-department" size={20} color="#FF6B6B" />,
      value: '420',
      label: 'Calories',
      unit: 'cal',
    },
    {
      icon: <Icon name="schedule" size={20} color="#4ECDC4" />,
      value: '28',
      label: 'Exercise',
      unit: 'min',
    },
    {
      icon: <Icon name="directions-walk" size={20} color="#45B7D1" />,
      value: '8,247',
      label: 'Steps',
      unit: '',
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <View style={styles.statIcon}>{stat.icon}</View>
          <Text style={styles.statValue}>
            {stat.value}
            <Text style={styles.statUnit}>{stat.unit}</Text>
          </Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default QuickStats;