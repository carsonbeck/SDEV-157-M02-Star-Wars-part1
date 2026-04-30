import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView,
  ActivityIndicator, SafeAreaView, Modal, TouchableOpacity,
  Image,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

export default function FilmsScreen() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState('');

  const [selectedItemTitle, setSelectedItemTitle] = useState('');
  const [itemModalVisible, setItemModalVisible] = useState(false);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await fetch('https://www.swapi.tech/api/films/');
      const data = await response.json();
      const filmList = data.result.map((item) => item.properties);
      setFilms(filmList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setSubmittedText(searchTerm);
    setModalVisible(true);
  };

  const handleSwipeOpen = (title) => {
    setSelectedItemTitle(title);
    setItemModalVisible(true);
  };

  const renderRightActions = (title) => (
    <TouchableOpacity
      style={styles.swipeAction}
      onPress={() => handleSwipeOpen(title)}
    >
      <Text style={styles.swipeActionText}>More</Text>
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
          uri: 'https://m.media-amazon.com/images/I/81Z7VaezkWL._AC_UF894,1000_QL80_.jpg',
        }}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search films..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.list}>
        {films.map((item) => (
          <Swipeable
            key={item.episode_id.toString()}
            renderRightActions={() => renderRightActions(item.title)}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.detail}>Episode: {item.episode_id}</Text>
              <Text style={styles.detail}>Release date: {item.release_date}</Text>
              <Text style={styles.detail}>Director: {item.director}</Text>
            </View>
          </Swipeable>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search Term</Text>
            <Text style={styles.modalText}>You searched for: {submittedText}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={itemModalVisible}
        onRequestClose={() => setItemModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Film</Text>
            <Text style={styles.modalText}>{selectedItemTitle}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setItemModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFE81F', marginBottom: 8 },
  detail: { fontSize: 14, color: '#ddd', marginBottom: 4 },
  errorText: { color: '#FFE81F', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE81F',
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFE81F', marginBottom: 16 },
  modalText: { fontSize: 18, color: '#fff', marginBottom: 24, textAlign: 'center' },
  closeButton: {
    backgroundColor: '#FFE81F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
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