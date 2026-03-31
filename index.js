import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlanetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planets</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFE81F',
  },
});