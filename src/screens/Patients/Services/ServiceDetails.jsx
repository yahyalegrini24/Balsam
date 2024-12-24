import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ServiceDetailsScreen = ({ route, navigation }) => {
  const { service, selectedProfessional ,selectedClinic} = route.params || {};
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleBooking = () => {
    setIsBookingConfirmed(true);
    setTimeout(() => {
      setIsBookingConfirmed(false);
    }, 2000);
  };

  if (!service) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Service details not available.</Text>
      </View>
    );
  }

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
        <View style={styles.iconContainer}>
          <Icon name={service.icon || 'help-circle'} size={width * 0.15} color="#FFF" />
        </View>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.category}>{service.category}</Text>
      </LinearGradient>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>About this service</Text>
        <Text style={styles.description}>{service.description}</Text>

        <Text style={styles.sectionTitle}>Service Details</Text>
        <View style={styles.detailsContainer}>
          <DetailItem icon="clock-outline" text={`Duration: ${service.duration || 'N/A'} minutes`} />
          <DetailItem icon="currency-usd" text={`Price: $${service.price || 'N/A'}`} />
          <DetailItem icon="map-marker" text={`Location: ${service.location || 'N/A'}`} />
          <DetailItem icon="calendar-range" text={`Availability: ${service.availability || 'N/A'}`} />
        </View>

        {service.included && service.included.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>What's Included</Text>
            <View style={styles.listContainer}>
              {service.included.map((item, index) => (
                <Text key={index} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Professional</Text>
        {selectedProfessional ? (
          <View style={styles.professionalInfo}>
            <Icon name="account" size={24} color="#4A90E2" />
            <View style={styles.professionalDetails}>
              <Text style={styles.professionalName}>{selectedProfessional.name}</Text>
              <Text style={styles.professionalSpecialty}>{selectedProfessional.specialty}</Text>
              <Text style={styles.professionalRating}>Rating: {selectedProfessional.rating} ⭐</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.chooseProfessionalButton}
            onPress={() =>
              navigation.navigate('ProfessionalList', {
                role: 'doctor',
                onSelectProfessional: (professional) =>
                  navigation.setParams({ selectedProfessional: professional }),
              })
            }
          >
            <Text style={styles.chooseProfessionalText}>
              Choose Professional
            </Text>
          </TouchableOpacity>
        )}
        {selectedClinic ? (
          <View style={styles.professionalInfo}>
            <Icon name="account" size={24} color="#4A90E2" />
            <View style={styles.professionalDetails}>
              <Text style={styles.professionalName}>{selectedClinic.name}</Text>
              <Text style={styles.professionalSpecialty}>{selectedClinic.specialty}</Text>
              <Text style={styles.professionalRating}>Rating: {selectedClinic.rating} ⭐</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.chooseProfessionalButton}
            onPress={() =>
              navigation.navigate('ClinicListScreen', {
               
                onSelectClinic: (Clinic) =>
                  navigation.setParams({ selectedClinic: Clinic }),
              })
            }
          >
            <Text style={styles.chooseProfessionalText}>
              Choose a Clinic
            </Text>
          </TouchableOpacity>
        )}
        {service.cancellationPolicy && (
          <>
            <Text style={styles.sectionTitle}>Cancellation Policy</Text>
            <Text style={styles.policyText}>{service.cancellationPolicy}</Text>
          </>
        )}

      </ScrollView>
      <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBooking}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={isBookingConfirmed}
        onRequestClose={() => setIsBookingConfirmed(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Icon name="check-circle" size={60} color="#4CAF50" />
            <Text style={styles.modalTitle}>Booking Confirmed!</Text>
            <Text style={styles.modalText}>
              {service.title} with {selectedClinic?.name || 'Selected Professional'}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const DetailItem = ({ icon, text }) => (
  <View style={styles.detailItem}>
    <Icon name={icon} size={20} color="#4A90E2" />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  category: {
    fontSize: 18,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  listContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  professionalDetails: {
    marginLeft: 10,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  professionalSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  professionalRating: {
    fontSize: 14,
    color: '#FFA500',
    marginTop: 5,
  },
  chooseProfessionalButton: {
    backgroundColor: '#5DADE2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  chooseProfessionalText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  policyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom:40,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    padding: 30,
    backgroundColor: '#FFF',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ServiceDetailsScreen;

