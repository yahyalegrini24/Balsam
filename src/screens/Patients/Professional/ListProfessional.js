import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

// Enhanced mock data for professionals
const professionals = [
  { id: 1, name: 'Dr. John Doe', role: 'doctor', image: 'https://via.placeholder.com/100', details: 'Experienced general practitioner with 15 years of practice.', rating: 4.8, availability: 'Available today' },
  { id: 2, name: 'Nurse Jane Smith', role: 'Registered Nurse', image: 'https://via.placeholder.com/100', details: 'Skilled nurse with 10 years of experience in patient care.', rating: 4.7, availability: 'Next available: Tomorrow' },
  { id: 3, name: 'Dr. Emily White', role: 'Cardiologist', image: 'https://via.placeholder.com/100', details: 'Cardiology specialist with expertise in heart health.', rating: 4.9, availability: 'Available today' },
  { id: 4, name: 'Dr. Michael Brown', role: 'Pediatrician', image: 'https://via.placeholder.com/100', details: 'Caring pediatrician specializing in child healthcare.', rating: 4.6, availability: 'Next available: In 2 days' },
  { id: 5, name: 'Dr. Sarah Johnson', role: 'Dermatologist', image: 'https://via.placeholder.com/100', details: 'Expert dermatologist focusing on skin health and treatments.', rating: 4.8, availability: 'Available today' },
];

const ProfessionalList = ({ route, navigation }) => {
  const { role, onSelectProfessional } = route.params;
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const filteredProfessionals = professionals.filter(
    (professional) => professional.role.toLowerCase().includes(role.toLowerCase())
  );

  const handleSelectProfessional = () => {
    if (selectedProfessional) {
      onSelectProfessional(selectedProfessional);
      navigation.goBack();
    } else {
      alert('Please select a professional first.');
    }
  };

  const renderProfessionalItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedProfessional?.id === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedProfessional(item)}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.professionalInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFA500" />
          <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.availability}>{item.availability}</Text>
        <TouchableOpacity
          style={styles.viewProfileButton}
          onPress={() => navigation.navigate('ProfessionalProfile', { professional: item })}
        >
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4F63AC', '#4F63AC']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a Professional</Text>
      </LinearGradient>
      <FlatList
        data={filteredProfessionals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProfessionalItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.chooseButton}
        onPress={handleSelectProfessional}
      >
        <Text style={styles.chooseButtonText}>
          {selectedProfessional ? 'Confirm Selection' : 'Choose a Professional'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  professionalInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FFA500',
    marginLeft: 4,
  },
  availability: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 8,
  },
  viewProfileButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  viewProfileText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  chooseButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  chooseButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfessionalList;

