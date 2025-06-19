import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ActivityRingsProps {
  data: {
    move: { current: number; goal: number };
    exercise: { current: number; goal: number };
    stand: { current: number; goal: number };
  };
  size: number;
}

export function ActivityRings({ data, size }: ActivityRingsProps) {
  const moveProgress = useSharedValue(0);
  const exerciseProgress = useSharedValue(0);
  const standProgress = useSharedValue(0);

  const strokeWidth = 12;
  const centerX = size / 2;
  const centerY = size / 2;
  
  const moveRadius = size / 2 - strokeWidth - 30;
  const exerciseRadius = size / 2 - strokeWidth - 50;
  const standRadius = size / 2 - strokeWidth - 70;

  const moveCircumference = 2 * Math.PI * moveRadius;
  const exerciseCircumference = 2 * Math.PI * exerciseRadius;
  const standCircumference = 2 * Math.PI * standRadius;

  useEffect(() => {
    moveProgress.value = withDelay(200, withSpring(data.move.current / data.move.goal));
    exerciseProgress.value = withDelay(400, withSpring(data.exercise.current / data.exercise.goal));
    standProgress.value = withDelay(600, withSpring(data.stand.current / data.stand.goal));
  }, [data]);

  const moveAnimatedStyle = useAnimatedStyle(() => ({
    strokeDashoffset: moveCircumference * (1 - Math.min(moveProgress.value, 1)),
  }));

  const exerciseAnimatedStyle = useAnimatedStyle(() => ({
    strokeDashoffset: exerciseCircumference * (1 - Math.min(exerciseProgress.value, 1)),
  }));

  const standAnimatedStyle = useAnimatedStyle(() => ({
    strokeDashoffset: standCircumference * (1 - Math.min(standProgress.value, 1)),
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circles */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={moveRadius}
          stroke="rgba(255, 107, 107, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={centerX}
          cy={centerY}
          r={exerciseRadius}
          stroke="rgba(78, 205, 196, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={centerX}
          cy={centerY}
          r={standRadius}
          stroke="rgba(69, 183, 209, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circles */}
        <AnimatedCircle
          cx={centerX}
          cy={centerY}
          r={moveRadius}
          stroke="#FF6B6B"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={moveCircumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${centerX} ${centerY})`}
          style={moveAnimatedStyle}
        />
        <AnimatedCircle
          cx={centerX}
          cy={centerY}
          r={exerciseRadius}
          stroke="#4ECDC4"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={exerciseCircumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${centerX} ${centerY})`}
          style={exerciseAnimatedStyle}
        />
        <AnimatedCircle
          cx={centerX}
          cy={centerY}
          r={standRadius}
          stroke="#45B7D1"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={standCircumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${centerX} ${centerY})`}
          style={standAnimatedStyle}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});