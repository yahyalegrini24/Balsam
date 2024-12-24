import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../../../components/BottomNavigationBar';

const { width } = Dimensions.get('window');

const categories = [
  'All', 'Upcoming', 'Past', 'Cancelled'
];

const bookings = [
  {
    id: '1',
    service: 'General Checkup',
    professional: 'Dr. Emily Smith',
    date: new Date(2024, 11, 25, 10, 0),
    status: 'Confirmed',
    category: 'Healthcare',
    price: 150,
  },
  {
    id: '2',
    service: 'Wound Dressing',
    professional: 'Nurse Kelly Johnson',
    date: new Date(2024, 11, 20, 15, 0),
    status: 'Pending',
    category: 'Healthcare',
    price: 75,
  },
  {
    id: '3',
    service: 'Job Interview',
    professional: 'HR Manager Tom Brown',
    date: new Date(2024, 11, 22, 14, 30),
    status: 'Scheduled',
    category: 'Career',
    price: 0,
  },
];

const BookingsScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter(booking => 
    (selectedCategory === 'All' || booking.status === selectedCategory) &&
    (booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
     booking.professional.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderBookingCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetailsScreen', { booking: item })}
    >
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingTitle}>{item.service}</Text>
        <Text style={styles.bookingProfessional}>{item.professional}</Text>
        <Text style={styles.bookingDate}>
          {item.date.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
        <Text style={styles.bookingPrice}>${item.price}</Text>
      </View>
      <View style={styles.bookingStatus}>
        <Text style={[styles.statusText, styles[item.status.toLowerCase()]]}>
          {item.status}
        </Text>
        <Icon name="chevron-right" size={24} color="#4A90E2" style={styles.bookingArrow} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                  <Icon name="chevron-left" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Bookings</Text>
              </View>
              <View style={styles.searchBar}>
                <Icon name="magnify" size={20} color="#4A90E2" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search booking"
                  placeholderTextColor="#4A90E2"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingsContainer}
      />

      <Footer />
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
        paddingTop: 40, // Adjust this value based on your status bar height
        borderBottomLeftRadius: width * 0.1, // Make it relative to screen width
        borderBottomRightRadius: width * 0.1,
      },
      headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      backButton: {
        marginRight: 15,
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
      },
      searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingHorizontal: 10,
      },
      searchIcon: {
        marginRight: 10,
      },
      searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#4A90E2',
      },
      categoriesContainer: {
        paddingBottom: 20,  // Keep the padding consistent
        paddingHorizontal: 20,
        alignItems: 'center',
        height: 100,  // Set fixed height to prevent the shift
        justifyContent: 'center', // Vertically center the category buttons
      },
      categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,  // Keep consistent padding
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: '#E0E0E0',
        minWidth: 50, // Set minimum width for the button
        height: 40, // Set a fixed height for the button
        alignItems: 'center', // Ensure text is horizontally centered
        justifyContent: 'center', // Ensure text is vertically centered
      },
      selectedCategory: {
        backgroundColor: '#4A90E2', // Highlight selected category
      },
      categoryText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
      },
      selectedCategoryText: {
        color: '#FFF', // Change text color when selected
      },
      bookingsContainer: {
      padding: 10,
      },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  bookingProfessional: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A90E2',
  },
  bookingStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
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
  cancelled: {
    backgroundColor: '#FFEBEE',
    color: '#F44336',
  },
  bookingArrow: {
    marginTop: 5,
  },
});

export default BookingsScreen;

