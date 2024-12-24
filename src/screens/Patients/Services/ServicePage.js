import React, { useState } from 'react';
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
  'All', 'General Care', 'Wound Care', 'Therapy', 'Specialized', 'Elderly Care'
];

const services = [
  { 
    id: '1', 
    title: 'General Consultation', 
    icon: 'stethoscope', 
    category: 'General Care',
    description: 'In-home consultations with general practitioners for routine check-ups, diagnosis, and treatment of common health conditions.',
    duration: '30-60 min',
    price: '$50-$100',
    location :"Main Street Medical Center",
    availability:"Monday to Friday, 9 AM to 5 PM",
    included:[
    "Physical examination",
    "Blood pressure check",
    "Cholesterol screening",
    "Blood glucose test",
    "Body mass index (BMI) calculation",
    "Personalized health recommendations"
  ],
    cancellationPolicy:'Free cancellation up to 24 hours before the appointment. Late cancellations or no-shows may incur a 50% charge.'
  },
  { 
    id: '2', 
    title: 'Wound Dressing', 
    icon: 'bandage', 
    category: 'Wound Care',
    description: 'Professional care for wounds, including cleaning, dressing changes, and monitoring the healing process.',
    duration: '15-30 min',
    price: '$30-$60'
  },
  { 
    id: '3', 
    title: 'Physical Therapy', 
    icon: 'run', 
    category: 'Therapy',
    description: 'Customized exercises and treatments to improve mobility, strength, and function after injury or surgery.',
    duration: '45-60 min',
    price: '$70-$120'
  },
  { 
    id: '4', 
    title: 'IV Administration', 
    icon: 'water', 
    category: 'Specialized',
    description: 'Safe and controlled administration of intravenous medications or fluids in the comfort of your home.',
    duration: '30-120 min',
    price: '$100-$200'
  },
  { 
    id: '5', 
    title: 'Elderly Assistance', 
    icon: 'account-heart', 
    category: 'Elderly Care',
    description: 'Compassionate support for daily activities, medication management, and companionship for elderly patients.',
    duration: '2-4 hours',
    price: '$80-$160'
  },
  { 
    id: '6', 
    title: 'Medication Management', 
    icon: 'pill', 
    category: 'General Care',
    description: 'Organization and administration of medications, ensuring proper dosage and timing for optimal health outcomes.',
    duration: '15-30 min',
    price: '$40-$80'
  },
  { 
    id: '7', 
    title: 'Blood Tests', 
    icon: 'test-tube', 
    category: 'General Care',
    description: 'Convenient blood sample collection for various diagnostic tests, performed by trained professionals in your home.',
    duration: '15-30 min',
    price: '$50-$100'
  },
  { 
    id: '8', 
    title: 'Respiratory Therapy', 
    icon: 'lungs', 
    category: 'Specialized',
    description: 'Specialized care for patients with breathing difficulties, including treatments and education for respiratory conditions.',
    duration: '30-60 min',
    price: '$80-$150'
  },
  { 
    id: '9', 
    title: 'Palliative Care', 
    icon: 'bed', 
    category: 'Specialized',
    description: 'Comfort care for patients with serious illnesses or at the end of life, focused on managing pain and improving quality of life.',
    duration: 'Varies',
    price: '$100-$250'
  },
  { 
    id: '10', 
    title: 'Chronic Disease Management', 
    icon: 'heart', 
    category: 'General Care',
    description: 'Care and monitoring for chronic conditions like hypertension, diabetes, and COPD, including medication management and lifestyle advice.',
    duration: '30-60 min',
    price: '$60-$120'
  },
  { 
    id: '11', 
    title: 'Occupational Therapy', 
    icon: 'wheelchair', 
    category: 'Therapy',
    description: 'Therapy to help patients regain or improve daily living skills after injury, surgery, or due to a disability.',
    duration: '45-60 min',
    price: '$70-$130'
  },
  { 
    id: '12', 
    title: 'Speech Therapy', 
    icon: 'microphone', 
    category: 'Therapy',
    description: 'Therapy to assist patients with speech and language disorders, including post-stroke recovery or communication challenges.',
    duration: '30-60 min',
    price: '$70-$120'
  },
  { 
    id: '13', 
    title: 'Telehealth Services', 
    icon: 'phone', 
    category: 'Consultation',
    description: 'Remote consultations via phone or video call for minor ailments, follow-ups, or mental health support.',
    duration: '15-30 min',
    price: '$40-$80'
  },
  { 
    id: '14', 
    title: 'Pediatric Care', 
    icon: 'baby', 
    category: 'Pediatrics',
    description: 'In-home care for children, including routine check-ups, vaccinations, and treatment of common childhood illnesses.',
    duration: '30-60 min',
    price: '$50-$100'
  },
  { 
    id: '15', 
    title: 'Maternal and Child Health', 
    icon: 'mother-heart', 
    category: 'Maternity',
    description: 'Care for new mothers and their babies, including breastfeeding support, newborn care, and postnatal check-ups.',
    duration: '1-2 hours',
    price: '$80-$150'
  },
  { 
    id: '16', 
    title: 'Infusion Therapy', 
    icon: 'drop', 
    category: 'Specialized',
    description: 'Administering IV fluids, antibiotics, or other medications directly into the bloodstream in the comfort of the patient’s home.',
    duration: '30-120 min',
    price: '$100-$200'
  },
  { 
    id: '17', 
    title: 'Diet and Nutrition Counseling', 
    icon: 'apple', 
    category: 'General Care',
    description: 'Dietary advice and meal planning for patients with specific health conditions like diabetes, heart disease, or obesity.',
    duration: '30-60 min',
    price: '$50-$100'
  },
  { 
    id: '18', 
    title: 'Pain Management', 
    icon: 'medkit', 
    category: 'Specialized',
    description: 'Focused care for patients with chronic pain conditions, including cancer, arthritis, or post-surgical recovery.',
    duration: '30-60 min',
    price: '$80-$150'
  },
  { 
    id: '19', 
    title: 'Elderly Care and Geriatrics', 
    icon: 'bed', 
    category: 'Elderly Care',
    description: 'General home care, medication management, companionship, and support for elderly patients.',
    duration: '2-4 hours',
    price: '$80-$160'
  },
  { 
    id: '20', 
    title: 'Blood Pressure and Monitoring', 
    icon: 'heart-pulse', 
    category: 'General Care',
    description: 'Home monitoring services for blood pressure, cholesterol levels, blood glucose, and other vital signs for patients with cardiovascular or metabolic conditions.',
    duration: '30-45 min',
    price: '$50-$100'
  }
];



const ServicesScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service => 
    (selectedCategory === 'All' || service.category === selectedCategory) &&
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderServiceCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetailsScreen', { service: item })}
    >
      <Icon name={item.icon} size={40} color="#4A90E2" />
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Our Services</Text>
          </View>
          <View style={styles.searchBar}>
            <Icon name="magnify" size={20} color="#4A90E2" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services"
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
          data={filteredServices}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.servicesContainer}
        />
      </View>
      <Footer/>
    </>
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
    paddingBottom: 30,  // Keep the padding consistent
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
  servicesContainer: {
    padding: 10,
   
    
  },
  serviceCard: {
    width: (width - 40) / 2,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  serviceCategory: {
    fontSize: 12,
    color: '#666',
   
  },
});



export default ServicesScreen;

