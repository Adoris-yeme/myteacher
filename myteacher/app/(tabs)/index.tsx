import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  BookOpen,
  ChevronRight,
} from 'lucide-react-native';

interface Tutor {
  id: string;
  name: string;
  subject: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  avatar: string;
  experience: string;
  isVerified: boolean;
  responseTime: string;
}

const MOCK_TUTORS: Tutor[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    subject: 'Mathématiques',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 35,
    location: 'Paris 15e',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    experience: '5 ans d\'expérience',
    isVerified: true,
    responseTime: '~2h',
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    subject: 'Physique-Chimie',
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 40,
    location: 'Paris 7e',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    experience: '8 ans d\'expérience',
    isVerified: true,
    responseTime: '~1h',
  },
  {
    id: '3',
    name: 'Marie Leroy',
    subject: 'Français',
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 30,
    location: 'Paris 11e',
    avatar: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    experience: '6 ans d\'expérience',
    isVerified: true,
    responseTime: '~3h',
  },
  {
    id: '4',
    name: 'Pierre Moreau',
    subject: 'Anglais',
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 38,
    location: 'Paris 6e',
    avatar: 'https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    experience: '10 ans d\'expérience',
    isVerified: true,
    responseTime: '~1h',
  },
];

const SUBJECTS = [
  'Mathématiques',
  'Physique-Chimie',
  'Français',
  'Anglais',
  'Histoire-Géo',
  'SVT',
  'Économie',
  'Philosophie',
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [tutors, setTutors] = useState<Tutor[]>(MOCK_TUTORS);
  const [showFilters, setShowFilters] = useState(false);

  const filterTutors = () => {
    let filtered = MOCK_TUTORS;
    
    if (searchQuery) {
      filtered = filtered.filter(tutor =>
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedSubject) {
      filtered = filtered.filter(tutor => tutor.subject === selectedSubject);
    }
    
    setTutors(filtered);
  };

  useEffect(() => {
    filterTutors();
  }, [searchQuery, selectedSubject]);

  const TutorCard = ({ tutor }: { tutor: Tutor }) => (
    <TouchableOpacity style={styles.tutorCard} activeOpacity={0.7}>
      <View style={styles.tutorHeader}>
        <Image source={{ uri: tutor.avatar }} style={styles.avatar} />
        <View style={styles.tutorInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.tutorName}>{tutor.name}</Text>
            {tutor.isVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.subject}>{tutor.subject}</Text>
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
      
      <View style={styles.tutorDetails}>
        <View style={styles.detailItem}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.detailText}>{tutor.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <BookOpen size={14} color="#6b7280" />
          <Text style={styles.detailText}>{tutor.experience}</Text>
        </View>
        <View style={styles.detailItem}>
          <Clock size={14} color="#6b7280" />
          <Text style={styles.detailText}>Répond en {tutor.responseTime}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contacter</Text>
        <ChevronRight size={16} color="#ffffff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header avec gradient */}
      <LinearGradient
        colors={['#2563EB', '#7C3AED']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Trouvez votre tuteur</Text>
        <Text style={styles.headerSubtitle}>
          Des professeurs qualifiés près de chez vous
        </Text>
        
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une matière ou un professeur..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filtres par matières */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subjectsScroll}
          >
            <TouchableOpacity
              style={[
                styles.subjectChip,
                !selectedSubject && styles.subjectChipActive,
              ]}
              onPress={() => setSelectedSubject('')}
            >
              <Text
                style={[
                  styles.subjectChipText,
                  !selectedSubject && styles.subjectChipTextActive,
                ]}
              >
                Toutes
              </Text>
            </TouchableOpacity>
            {SUBJECTS.map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[
                  styles.subjectChip,
                  selectedSubject === subject && styles.subjectChipActive,
                ]}
                onPress={() => setSelectedSubject(subject)}
              >
                <Text
                  style={[
                    styles.subjectChipText,
                    selectedSubject === subject && styles.subjectChipTextActive,
                  ]}
                >
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Liste des tuteurs */}
      <FlatList
        data={tutors}
        renderItem={({ item }) => <TutorCard tutor={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tutorsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  subjectsScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  subjectChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  subjectChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  subjectChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  subjectChipTextActive: {
    color: '#ffffff',
  },
  tutorsList: {
    padding: 20,
    paddingBottom: 100,
  },
  tutorCard: {
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
  tutorHeader: {
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
  tutorInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  tutorName: {
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
  verifiedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  subject: {
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
  tutorDetails: {
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