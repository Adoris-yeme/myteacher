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
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Search,
  MessageCircle,
  ChevronRight,
  Clock,
} from 'lucide-react-native';

interface Conversation {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    tutorName: 'Sophie Martin',
    tutorAvatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastMessage: 'Parfait ! À demain pour notre cours de maths 📚',
    timestamp: '14:30',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '2',
    tutorName: 'Thomas Dubois',
    tutorAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastMessage: 'J\'ai préparé des exercices supplémentaires pour vous',
    timestamp: 'Hier',
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: '3',
    tutorName: 'Marie Leroy',
    tutorAvatar: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastMessage: 'Merci pour votre retour sur le devoir !',
    timestamp: 'Lundi',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '4',
    tutorName: 'Pierre Moreau',
    tutorAvatar: 'https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastMessage: 'Pouvons-nous décaler le cours de 30 minutes ?',
    timestamp: 'Dimanche',
    unreadCount: 1,
    isOnline: false,
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);

  const filterConversations = () => {
    if (!searchQuery) return MOCK_CONVERSATIONS;
    
    return MOCK_CONVERSATIONS.filter(conversation =>
      conversation.tutorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const ConversationCard = ({ conversation }: { conversation: Conversation }) => (
    <TouchableOpacity style={styles.conversationCard} activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: conversation.tutorAvatar }} style={styles.avatar} />
        {conversation.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.conversationInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.tutorName}>{conversation.tutorName}</Text>
          <Text style={styles.timestamp}>{conversation.timestamp}</Text>
        </View>
        <Text
          style={[
            styles.lastMessage,
            conversation.unreadCount > 0 && styles.unreadMessage,
          ]}
          numberOfLines={2}
        >
          {conversation.lastMessage}
        </Text>
      </View>
      
      <View style={styles.rightSection}>
        {conversation.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
          </View>
        )}
        <ChevronRight size={16} color="#9ca3af" />
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
        <Text style={styles.headerTitle}>Messages</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une conversation..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <FlatList
        data={filterConversations()}
        renderItem={({ item }) => <ConversationCard conversation={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MessageCircle size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>Aucune conversation</Text>
            <Text style={styles.emptySubtitle}>
              Vos messages avec les tuteurs apparaîtront ici
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
  searchContainer: {
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
  conversationsList: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  conversationCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  conversationInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#1f2937',
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  unreadBadge: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  unreadCount: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
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