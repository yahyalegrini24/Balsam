import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const BookingDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { booking } = route.params;

  const handleConfirm = () => {
    navigation.navigate('PaymentScreen', { booking });
  };

  const handleCancel = () => {
    // Implement cancellation logic here
    alert('Booking cancelled');
    navigation.goBack();
  };

  const handleReschedule = () => {
    // Implement rescheduling logic here
    alert('Reschedule functionality to be implemented');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.detailsContainer}>
          <Text style={styles.serviceName}>{booking.service}</Text>
          <Text style={styles.professionalName}>{booking.professional}</Text>
          <View style={styles.infoRow}>
            <Icon name="calendar" size={20} color="#4A90E2" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {booking.date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="tag" size={20} color="#4A90E2" style={styles.infoIcon} />
            <Text style={styles.infoText}>{booking.category}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="cash" size={20} color="#4A90E2" style={styles.infoIcon} />
            <Text style={styles.price}>Price: ${booking.price}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, styles[booking.status.toLowerCase()]]}>
              {booking.status}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Icon name="check" size={20} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Icon name="close" size={20} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.rescheduleButton]} onPress={handleReschedule}>
            <Icon name="calendar-clock" size={20} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#4F63AC',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4F63AC',
  },
  professionalName: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statusContainer: {
    marginTop: 15,
    alignItems: 'flex-start',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  confirmed: {
    backgroundColor: '#E8F5E9',
    color: '#4CAF50',
  },
  pending: {
    backgroundColor: '#FFF3E0',
    color: '#FF9800',
  },
  scheduled: {
    backgroundColor: '#E3F2FD',
    color: '#2196F3',
  },
  completed: {
    backgroundColor: '#EFEBE9',
    color: '#795548',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4F63AC',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  rescheduleButton: {
    backgroundColor: '#FF9800',
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingDetailsScreen;

