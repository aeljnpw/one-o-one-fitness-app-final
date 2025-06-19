import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FriendCardProps {
  friend: {
    id: number;
    name: string;
    avatar: string;
    status: string;
    rings: { move: number; exercise: number; stand: number };
    isOnline: boolean;
  };
}

export function FriendCard({ friend }: FriendCardProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.leftSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{friend.avatar}</Text>
          {friend.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{friend.name}</Text>
          <Text style={styles.status}>{friend.status}</Text>
        </View>
      </View>
      <View style={styles.ringsContainer}>
        <View style={styles.miniRings}>
          <View style={[styles.miniRing, { backgroundColor: '#FF6B6B' }]}>
            <View style={[styles.miniRingFill, { 
              width: `${friend.rings.move * 100}%`,
              backgroundColor: '#FF6B6B'
            }]} />
          </View>
          <View style={[styles.miniRing, { backgroundColor: 'rgba(78, 205, 196, 0.3)' }]}>
            <View style={[styles.miniRingFill, { 
              width: `${friend.rings.exercise * 100}%`,
              backgroundColor: '#4ECDC4'
            }]} />
          </View>
          <View style={[styles.miniRing, { backgroundColor: 'rgba(69, 183, 209, 0.3)' }]}>
            <View style={[styles.miniRingFill, { 
              width: `${friend.rings.stand * 100}%`,
              backgroundColor: '#45B7D1'
            }]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#30D158',
    borderWidth: 2,
    borderColor: '#2C2C2E',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  status: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  ringsContainer: {
    marginLeft: 12,
  },
  miniRings: {
    gap: 4,
  },
  miniRing: {
    width: 60,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniRingFill: {
    height: '100%',
    borderRadius: 2,
  },
});