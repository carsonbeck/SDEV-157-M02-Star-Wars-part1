import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';

export default function PlanetDetailScreen({ route }) {
  const { planet } = route.params;

  // Format numeric values with commas, leave non-numeric as-is
  const formatValue = (value, isNumeric = false) => {
    if (!value || value === 'unknown') return 'unknown';
    if (isNumeric) {
      const num = Number(value);
      if (isNaN(num)) return value; // fallback if not a number
      return num.toLocaleString();
    }
    return value;
  };

  const InfoRow = ({ label, value, numeric = false }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{formatValue(value, numeric)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{planet.name}</Text>

        <View style={styles.card}>
          <InfoRow label="Climate" value={planet.climate} />
          <InfoRow label="Terrain" value={planet.terrain} />
          <InfoRow label="Population" value={planet.population} numeric />
          <InfoRow label="Gravity" value={planet.gravity} />
          <InfoRow label="Diameter (km)" value={planet.diameter} numeric />
          <InfoRow label="Orbital Period (days)" value={planet.orbital_period} numeric />
          <InfoRow label="Rotation Period (hours)" value={planet.rotation_period} numeric />
          <InfoRow label="Surface Water (%)" value={planet.surface_water} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 16 },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFE81F',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE81F',
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  label: { fontSize: 16, color: '#FFE81F', fontWeight: '600', flex: 1 },
  value: { fontSize: 16, color: '#fff', textAlign: 'right', flex: 1, marginLeft: 12 },
});