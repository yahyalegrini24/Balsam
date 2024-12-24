import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Header from '../../../components/Header';
import Footer from '../../../components/BottomNavigationBar';
import HealthcareService from '../../../components/HealtheCare';
import NearbyProfessionals from '../../../components/nearby';
import Emergency from '../../../components/emergency';
import NearbyClinic from '../../../components/nearbyClinic';

const HomePage = () => {
  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView >
        <Header />
        <HealthcareService />
        <NearbyProfessionals />
        <Emergency />
        <NearbyClinic />
      </ScrollView>

      {/* Fixed Footer */}
      <Footer />
    </View>
  );
};

export default HomePage;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the full screen height
    backgroundColor: '#F9F9F9',
  },
 
});
