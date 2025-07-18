import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Star,
  MapPin,
  Clock,
  BookOpen,
  ChevronRight,
  Shield,
} from 'lucide-react-native';
import { Tutor } from '@/types/user';

interface TutorCardProps {
  tutor: Tutor;
  onPress?: () => void;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.header}>
        <Image source={{ uri: tutor.avatar || 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg' }} style={styles.avatar} />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{tutor.name}</Text>
            {tutor.isVerified && (
              <View style={styles.verifiedBadge}>
                <Shield size={12} color="#ffffff" />
              </View>
            )}
          </View>
          <Text style={styles.subjects}>
            {tutor.subjects.map(s => s.name).join(', ')}
          </Text>
          <View style={styles.ratingRow}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{tutor.rating}</Text>
            <Text style={styles.reviewCount}>({tutor.reviewCount} avis)</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{tutor.hourlyRate}€</Text>
          <Text style={styles.priceUnit}>/heure</Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.detailText}>{tutor.location.city}</Text>
        </View>
        <View style={styles.detailItem}>
          <BookOpen size={14} color="#6b7280" />
          <Text style={styles.detailText}>{tutor.experience} ans d'expérience</Text>
        </View>
        <View style={styles.detailItem}>
          <Clock size={14} color="#6b7280" />
          <Text style={styles.detailText}>Disponible aujourd'hui</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contacter</Text>
        <ChevronRight size={16} color="#ffffff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#10b981',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjects: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 4,
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
  },
  priceUnit: {
    fontSize: 12,
    color: '#6b7280',
  },
  details: {
    gap: 8,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  contactButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});