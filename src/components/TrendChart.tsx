import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

interface TrendChartProps {
  data: Array<{
    day: string;
    move: number;
    exercise: number;
    stand: number;
  }>;
}

const TrendChart: React.FC<TrendChartProps> = ({data}) => {
  const maxMove = Math.max(...data.map(d => d.move));
  const maxExercise = Math.max(...data.map(d => d.exercise));

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chart}>
          <View style={styles.barsContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.dayContainer}>
                <View style={styles.barsGroup}>
                  <View style={styles.bar}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: `${(item.move / maxMove) * 100}%`,
                          backgroundColor: '#FF6B6B',
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.bar}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: `${(item.exercise / maxExercise) * 100}%`,
                          backgroundColor: '#4ECDC4',
                        },
                      ]}
                    />
                  </View>
                </View>
                <Text style={styles.dayLabel}>{item.day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, {backgroundColor: '#FF6B6B'}]}
              />
              <Text style={styles.legendText}>Move</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, {backgroundColor: '#4ECDC4'}]}
              />
              <Text style={styles.legendText}>Exercise</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
  },
  chart: {
    minWidth: 300,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 16,
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barsGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: 8,
  },
  bar: {
    width: 8,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default TrendChart;