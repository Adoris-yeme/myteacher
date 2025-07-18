import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, MapPin, User, MessageCircle, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

interface Booking {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    tutorName: 'Sophie Martin',
    tutorAvatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    subject: 'Mathématiques',
    date: '2024-01-20',
    time: '14:00',
    duration: 2,
    location: 'À domicile',
    status: 'upcoming',
    price: 70,
  },
  {
    id: '2',
    tutorName: 'Thomas Dubois',
    tutorAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    subject: 'Physique-Chimie',
    date: '2024-01-15',
    time: '16:30',
    duration: 1.5,
    location: 'En ligne',
    status: 'completed',
    price: 60,
  },
  {
    id: '3',
    tutorName: 'Marie Leroy',
    tutorAvatar: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    subject: 'Français',
    date: '2024-01-25',
    time: '10:00',
    duration: 2,
    location: 'À domicile',
    status: 'upcoming',
    price: 60,
  },
];

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const filteredBookings = MOCK_BOOKINGS.filter(booking => 
    activeTab === 'upcoming' 
      ? booking.status === 'upcoming'
      : booking.status === 'completed'
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock size={16} color="#2563EB" />;
      case 'completed':
        return <CheckCircle size={16} color="#10b981" />;
      case 'cancelled':
        return <AlertCircle size={16} color="#ef4444" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#2563EB';
      case 'completed':
        return '#10b981';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'À venir';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <TouchableOpacity style={styles.bookingCard} activeOpacity={0.7}>
      <View style={styles.bookingHeader}>
        <Image source={{ uri: booking.tutorAvatar }} style={styles.tutorAvatar} />
        <View style={styles.bookingInfo}>
          <Text style={styles.tutorName}>{booking.tutorName}</Text>
          <Text style={styles.subject}>{booking.subject}</Text>
          <View style={styles.statusContainer}>
            {getStatusIcon(booking.status)}
            <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
              {getStatusText(booking.status)}
            </Text>
          </View>
        </View>
        <Text style={styles.price}>{booking.price}€</Text>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Calendar size={16} color="#6b7280" />
          <Text style={styles.detailText}>
            {formatDate(booking.date)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color="#6b7280" />
          <Text style={styles.detailText}>
            {booking.time} • {booking.duration}h
          </Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#6b7280" />
          <Text style={styles.detailText}>{booking.location}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.messageButton}>
          <MessageCircle size={16} color="#2563EB" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        
        {booking.status === 'upcoming' && (
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleButtonText}>Reprogrammer</Text>
          </TouchableOpacity>
        )}
        
        {booking.status === 'completed' && (
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Laisser un avis</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#2563EB', '#7C3AED']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Mes réservations</Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'upcoming' && styles.activeTabText,
              ]}
            >
              À venir
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'completed' && styles.activeTabText,
              ]}
            >
              Historique
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        data={filteredBookings}
        renderItem={({ item }) => <BookingCard booking={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Calendar size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>Aucune réservation</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'upcoming'
                ? 'Vous n\'avez pas de cours programmés'
                : 'Votre historique de cours apparaîtra ici'}
            </Text>
          </View>
        }
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
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activeTabText: {
    color: '#2563EB',
  },
  bookingsList: {
    padding: 20,
    paddingBottom: 100,
  },
  bookingCard: {
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
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  tutorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  bookingInfo: {
    flex: 1,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  subject: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
  bookingDetails: {
    gap: 8,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  messageButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  rescheduleButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewButton: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});