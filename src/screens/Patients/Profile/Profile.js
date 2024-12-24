import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../../../components/BottomNavigationBar';

const { width } = Dimensions.get('window');

const userProfiles = {
  patient: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    type: 'patient',
    dateOfBirth: 'January 15, 1980',
    bloodType: 'A+',
    allergies: 'Peanuts, Penicillin',
    emergencyContact: 'Jane Doe: +1 (555) 987-6543',
  },
  professional: {
    name: 'Dr. Sarah Smith',
    email: 'dr.smith@example.com',
    phone: '+1 (555) 234-5678',
    type: 'professional',
    specialty: 'Cardiologist',
    license: 'MED12345',
    yearsOfExperience: '15',
    availableHours: 'Mon-Fri, 9AM-5PM',
  },
  admin: {
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1 (555) 345-6789',
    type: 'admin',
    role: 'System Administrator',
    department: 'IT',
    accessLevel: 'Full Access',
  },
};

const ProfileScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('patient');
  const profile = userProfiles[userType];

  const renderProfileField = (key, value) => (
    <View style={styles.fieldContainer} key={key}>
      <Text style={styles.fieldLabel}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );

  const renderProfileFields = () => {
    return Object.entries(profile).map(([key, value]) => {
      if (key !== 'type' && typeof value === 'string') {
        return renderProfileField(key, value);
      }
      return null;
    });
  };

  const getProfileIcon = (type) => {
    switch (type) {
      case 'patient':
        return 'account-heart';
      case 'professional':
        return 'doctor';
      case 'admin':
        return 'shield-account';
      default:
        return 'account';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileType}>{userType.charAt(0).toUpperCase() + userType.slice(1)}</Text>
        </View>

        <View style={styles.userTypeSelector}>
          {['patient', 'professional', 'admin'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.userTypeButton, userType === type && styles.selectedUserType]}
              onPress={() => setUserType(type)}
            >
              <Icon
                name={getProfileIcon(type)}
                size={24}
                color={userType === type ? '#4F63AC' : '#777'}
              />
              <Text style={[styles.userTypeText, userType === type && styles.selectedUserTypeText]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.profileInfo}>
          {renderProfileFields()}
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Icon name="pencil" size={20} color="#FFF" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>

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
    paddingTop: 40,
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
  },
  headerTop: {
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
  scrollContent: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileType: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  userTypeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userTypeButton: {
    alignItems: 'center',
    padding: 10,
  },
  selectedUserType: {
    backgroundColor: '#F0F4FF',
    borderRadius: 10,
  },
  userTypeText: {
    marginTop: 5,
    fontSize: 12,
    color: '#777',
  },
  selectedUserTypeText: {
    color: '#4F63AC',
    fontWeight: 'bold',
  },
  profileInfo: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#4F63AC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;

