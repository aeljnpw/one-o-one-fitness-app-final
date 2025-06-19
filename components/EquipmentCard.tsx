import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { Equipment } from '@/types/database';

interface EquipmentCardProps {
  equipment: Equipment;
  onPress?: () => void;
}

export function EquipmentCard({ equipment, onPress }: EquipmentCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {equipment.image_url ? (
        <Image 
          source={{ uri: equipment.image_url }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>🏋️‍♂️</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name}>{equipment.name}</Text>
        <Text style={styles.category}>{equipment.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    width: 160,
    marginRight: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  placeholderImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#3C3C3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
}); 