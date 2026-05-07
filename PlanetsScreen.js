import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView,
  ActivityIndicator, SafeAreaView, TouchableOpacity,
  Animated, Image,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

export default function PlanetsScreen({ navigation }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const listResponse = await fetch('https://www.swapi.tech/api/planets/');
      const listData = await listResponse.json();
      const planetResults = listData.results;

      const detailedPlanets = await Promise.all(
        planetResults.map(async (planet) => {
          const detailResponse = await fetch(planet.url);
          const detailData = await detailResponse.json();
          return detailData.result.properties;
        })
      );
      setPlanets(detailedPlanets);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlanets = useMemo(() => {
    if (!searchTerm.trim()) return planets;
    const lowerTerm = searchTerm.toLowerCase();
    return planets.filter(planet =>
      planet.name.toLowerCase().includes(lowerTerm)
    );
  }, [planets, searchTerm]);

  const formatPopulation = (population) => {
    if (population === 'unknown' || !population) return 'unknown';
    return Number(population).toLocaleString();
  };

  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.swipeAction}
      onPress={() => navigation.navigate('PlanetDetail', { planet: item })}
    >
      <Text style={styles.swipeActionText}>Details</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFE81F" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: 'https://preview.redd.it/star-wars-planets-wallpaper-4k-v0-z46q5zj4hzle1.jpg?width=1080&crop=smart&auto=webp&s=83b92b0b478143f643e6392e3e010dd4a7bb08c2',
        }}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search planet..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
          returnKeyType="search"
        />
      </View>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.list}>
          {filteredPlanets.map((item) => (
            <Swipeable
              key={item.name}
              renderRightActions={() => renderRightActions(item)}
            >
              <View style={styles.itemContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>Climate: {item.climate}</Text>
                <Text style={styles.detail}>Terrain: {item.terrain}</Text>
                <Text style={styles.detail}>
                  Population: {formatPopulation(item.population)}
                </Text>
              </View>
            </Swipeable>
          ))}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  headerImage: {
    width: '100%',
    height: 160,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 10,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#000',
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#FFE81F',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  scrollContainer: { flex: 1 },
  list: { padding: 16 },
  itemContainer: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE81F',
  },
  name: { fontSize: 20, fontWeight: 'bold', color: '#FFE81F', marginBottom: 8 },
  detail: { fontSize: 14, color: '#ddd', marginBottom: 4 },
  errorText: { color: '#FFE81F', fontSize: 16 },
  swipeAction: {
    backgroundColor: '#FFE81F',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 12,
    borderRadius: 8,
  },
  swipeActionText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});