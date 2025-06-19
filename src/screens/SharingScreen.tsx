import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FriendCard from '../components/FriendCard';
import ShareCard from '../components/ShareCard';

const SharingScreen = () => {
  const friends = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '👩‍🦰',
      status: 'Just completed a 5K run!',
      rings: {move: 0.8, exercise: 0.9, stand: 0.6},
      isOnline: true,
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: '👨‍💼',
      status: "Crushed today's workout 💪",
      rings: {move: 1.0, exercise: 0.7, stand: 1.0},
      isOnline: true,
    },
    {
      id: 3,
      name: 'Emma Davis',
      avatar: '👩‍🎨',
      status: 'Yoga session complete 🧘‍♀️',
      rings: {move: 0.6, exercise: 0.5, stand: 0.8},
      isOnline: false,
    },
    {
      id: 4,
      name: 'Alex Rivera',
      avatar: '👨‍🔬',
      status: 'New personal best!',
      rings: {move: 0.9, exercise: 1.0, stand: 0.9},
      isOnline: true,
    },
  ];

  const achievements = [
    {
      id: 1,
      title: 'Perfect Week',
      description: 'Closed all rings for 7 days',
      icon: '🏆',
      date: 'Today',
      gradient: ['#FFD93D', '#FFE066'],
    },
    {
      id: 2,
      title: 'Move Goal 200%',
      description: 'Doubled your move goal',
      icon: '🔥',
      date: 'Yesterday',
      gradient: ['#FF6B6B', '#FF8E8E'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1C1C1E', '#2C2C2E']} style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Sharing</Text>
            <TouchableOpacity style={styles.addButton}>
              <Icon name="person-add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Achievements</Text>
              <TouchableOpacity>
                <Icon name="share" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
            <View style={styles.achievementsContainer}>
              {achievements.map(achievement => (
                <ShareCard key={achievement.id} achievement={achievement} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Friends</Text>
              <View style={styles.friendsStats}>
                <Icon name="emoji-events" size={16} color="#FFD93D" />
                <Text style={styles.friendsStatsText}>4 online</Text>
              </View>
            </View>
            <View style={styles.friendsContainer}>
              {friends.map(friend => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.inviteButton}>
            <LinearGradient
              colors={['#FF6B6B', '#FF8E8E']}
              style={styles.inviteGradient}>
              <Icon name="person-add" size={20} color="#FFFFFF" />
              <Text style={styles.inviteText}>Invite Friends</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  friendsStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  friendsStatsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  achievementsContainer: {
    gap: 12,
  },
  friendsContainer: {
    gap: 12,
  },
  inviteButton: {
    marginBottom: 100,
  },
  inviteGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  inviteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SharingScreen;