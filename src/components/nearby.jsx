import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';


const { width } = Dimensions.get('window'); // Get screen width

const professionals = [
  {
    id: '1',
    name: 'Dr. Alice Green',
    specialty: 'General Practitioner',
    avatar: require('../../assets/test.jpg'),
  },
  {
    id: '2',
    name: 'Nurse Bob White',
    specialty: 'Wound Care Specialist',
    avatar: require('../../assets/test.jpg'),
  },
  {
    id: '3',
    name: 'Dr. Emily Black',
    specialty: 'Physiotherapist',
    avatar: require('../../assets/test.jpg'),
  },
];

export default function NearbyProfessionals() {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Nearby Professionals</Text>
        {/* See All button with arrow */}
        <TouchableOpacity style={styles.seeAllButton} onPress={() =>navigation.navigate('NearbyProfessionals')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={professionals}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Ensures unique keys
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.avatar} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop:-80, // Adjust marginTop for spacing if needed
  },
  headerContainer: {
    flexDirection: 'row', // Align title and button in a row
    justifyContent: 'flex-start', // Space out title and button
    alignItems: 'center', // Vertically center the elements
    marginBottom: 10, // Add margin below the header
  },
  title: {
    fontSize: width * 0.045, // Scales font size based on screen width
    fontWeight: '600',
  },
  seeAllButton: {
    flexDirection: 'row', // Align text and arrow in a row
    marginLeft:145,
    alignItems: 'center', // Vertically center the arrow with the text
  },
  seeAllText: {
    fontSize: width * 0.04, // Scales text size
    fontWeight: '600',
    color: 'blue',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    borderRadius: 30,
    width: width * 0.4, // 40% of screen width for card size
    alignItems: 'center',
    elevation: 3, // Adds shadow for Android
  },
  avatar: {
    width: width * 0.15, // Scales avatar size relative to screen width
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    marginBottom: 10,
  },
  name: {
    fontSize: width * 0.04, // Scales text size
    fontWeight: '600',
    textAlign: 'center', // Centers text if names are long
  },
  specialty: {
    fontSize: width * 0.035, // Scales text size
    color: '#666',
    textAlign: 'center',
  },
});
