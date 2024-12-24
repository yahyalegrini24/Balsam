import React, { useState } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, MessageCircle, Heart, ChevronLeft } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const ProfessionalProfile = ({ route, navigation }) => {
  const { professional } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement logic to add/remove from favorites list
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    // TODO: Implement logic to submit rating to backend
  };

  const handleChat = () => {
    // TODO: Implement navigation to chat screen
    console.log('Navigate to chat with', professional.name);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../../../assets/profile.jpg')} />
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={styles.imageOverlay}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={28} color="#FFF" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{professional.name}</Text>
        <Text style={styles.role}>{professional.role}</Text>
        <View style={styles.ratingContainer}>
          <Star size={20} color="#FFA500" fill="#FFA500" />
          <Text style={styles.rating}>{professional.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.availability}>{professional.availability}</Text>
        <View style={styles.infoContainer}>
          <InfoItem icon="briefcase" text="15+ years experience" />
          <InfoItem icon="award" text="Board Certified" />
          <InfoItem icon="globe" text="Speaks English, Spanish" />
        </View>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.details}>{professional.details}</Text>
        <Text style={styles.sectionTitle}>Specializations</Text>
        <View style={styles.specializationContainer}>
          {['General Health', 'Preventive Care', 'Chronic Disease Management'].map((item, index) => (
            <View key={index} style={styles.specializationItem}>
              <Text style={styles.specializationText}>{item}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Rate this Professional</Text>
        <View style={styles.ratingInputContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <Star
                size={30}
                color={star <= userRating ? '#FFA500' : '#D3D3D3'}
                fill={star <= userRating ? '#FFA500' : 'none'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
          <Heart size={24} color={isFavorite ? '#FF6B6B' : '#FFF'} fill={isFavorite ? '#FF6B6B' : 'none'} />
          <Text style={styles.buttonText}>{isFavorite ? 'Favorited' : 'Add to Favorites'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <MessageCircle size={24} color="#FFF" />
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoItem = ({ icon, text }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.4,
    position: 'relative',
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  role: {
    fontSize: 18,
    color: '#4A90E2',
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    alignSelf:'center'
  },
  rating: {
    fontSize: 18,
    color: '#FFA500',
    marginLeft: 5,
    fontWeight: 'bold',
    alignSelf:'center'
  },
  availability: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    fontSize: 24,
    color: '#4A90E2',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  specializationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  specializationItem: {
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  specializationText: {
    color: '#0288D1',
    fontSize: 14,
  },
  ratingInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#F5F7FA',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  favoriteButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  chatButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ProfessionalProfile;

