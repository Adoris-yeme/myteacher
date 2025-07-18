import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  Settings,
  UserPlus,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
} from 'lucide-react-native';
import { useAuth } from '@/components/AuthProvider';

interface AdminStat {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface AdminAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onPress: () => void;
}

interface PendingItem {
  id: string;
  type: 'tutor_approval' | 'booking_dispute' | 'payment_issue';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export default function AdminScreen() {
  const { user, hasPermission } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const adminStats: AdminStat[] = [
    {
      id: '1',
      title: 'Utilisateurs actifs',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: <Users size={24} color="#2563EB" />,
      color: '#2563EB',
    },
    {
      id: '2',
      title: 'Tuteurs vérifiés',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: <UserCheck size={24} color="#10b981" />,
      color: '#10b981',
    },
    {
      id: '3',
      title: 'Réservations ce mois',
      value: '1,234',
      change: '+15%',
      changeType: 'positive',
      icon: <Calendar size={24} color="#7C3AED" />,
      color: '#7C3AED',
    },
    {
      id: '4',
      title: 'Revenus (€)',
      value: '45,678',
      change: '+23%',
      changeType: 'positive',
      icon: <DollarSign size={24} color="#F59E0B" />,
      color: '#F59E0B',
    },
  ];

  const quickActions: AdminAction[] = [
    {
      id: '1',
      title: 'Gérer les sous-admins',
      description: 'Ajouter ou modifier les permissions',
      icon: <Shield size={24} color="#ffffff" />,
      color: '#2563EB',
      onPress: () => Alert.alert('Gestion des sous-admins', 'Fonctionnalité en développement'),
    },
    {
      id: '2',
      title: 'Approuver les tuteurs',
      description: 'Valider les nouveaux profils',
      icon: <UserPlus size={24} color="#ffffff" />,
      color: '#10b981',
      onPress: () => Alert.alert('Approbation tuteurs', 'Fonctionnalité en développement'),
    },
    {
      id: '3',
      title: 'Rapports financiers',
      description: 'Consulter les analyses',
      icon: <BarChart3 size={24} color="#ffffff" />,
      color: '#7C3AED',
      onPress: () => Alert.alert('Rapports', 'Fonctionnalité en développement'),
    },
    {
      id: '4',
      title: 'Paramètres système',
      description: 'Configuration générale',
      icon: <Settings size={24} color="#ffffff" />,
      color: '#6b7280',
      onPress: () => Alert.alert('Paramètres', 'Fonctionnalité en développement'),
    },
  ];

  const pendingItems: PendingItem[] = [
    {
      id: '1',
      type: 'tutor_approval',
      title: 'Nouveau tuteur en attente',
      description: 'Marie Dupont - Mathématiques',
      priority: 'high',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      type: 'booking_dispute',
      title: 'Litige de réservation',
      description: 'Cours annulé - Remboursement demandé',
      priority: 'medium',
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      type: 'payment_issue',
      title: 'Problème de paiement',
      description: 'Transaction échouée - 150€',
      priority: 'high',
      createdAt: '2024-01-13',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case 'tutor_approval': return <UserCheck size={16} color="#6b7280" />;
      case 'booking_dispute': return <AlertTriangle size={16} color="#6b7280" />;
      case 'payment_issue': return <DollarSign size={16} color="#6b7280" />;
      default: return <Clock size={16} color="#6b7280" />;
    }
  };

  const StatCard = ({ stat }: { stat: AdminStat }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
          {stat.icon}
        </View>
        <Text style={[styles.statChange, { 
          color: stat.changeType === 'positive' ? '#10b981' : '#ef4444' 
        }]}>
          {stat.change}
        </Text>
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statTitle}>{stat.title}</Text>
    </View>
  );

  const ActionCard = ({ action }: { action: AdminAction }) => (
    <TouchableOpacity
      style={[styles.actionCard, { backgroundColor: action.color }]}
      onPress={action.onPress}
      activeOpacity={0.8}
    >
      <View style={styles.actionIcon}>
        {action.icon}
      </View>
      <Text style={styles.actionTitle}>{action.title}</Text>
      <Text style={styles.actionDescription}>{action.description}</Text>
    </TouchableOpacity>
  );

  const PendingCard = ({ item }: { item: PendingItem }) => (
    <TouchableOpacity style={styles.pendingCard} activeOpacity={0.7}>
      <View style={styles.pendingHeader}>
        <View style={styles.pendingLeft}>
          {getPriorityIcon(item.type)}
          <View style={styles.pendingInfo}>
            <Text style={styles.pendingTitle}>{item.title}</Text>
            <Text style={styles.pendingDescription}>{item.description}</Text>
          </View>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
          <Text style={styles.priorityText}>
            {item.priority === 'high' ? 'Urgent' : item.priority === 'medium' ? 'Moyen' : 'Faible'}
          </Text>
        </View>
      </View>
      <Text style={styles.pendingDate}>
        {new Date(item.createdAt).toLocaleDateString('fr-FR')}
      </Text>
    </TouchableOpacity>
  );

  if (!user || (user.role !== 'admin' && user.role !== 'sub_admin')) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.unauthorizedContainer}>
          <Shield size={64} color="#ef4444" />
          <Text style={styles.unauthorizedTitle}>Accès non autorisé</Text>
          <Text style={styles.unauthorizedText}>
            Vous n'avez pas les permissions nécessaires pour accéder à cette section.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#2563EB', '#7C3AED']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Administration</Text>
          <Text style={styles.headerSubtitle}>
            {user.role === 'admin' ? 'Administrateur principal' : 'Sous-administrateur'}
          </Text>
        </View>
        
        <View style={styles.periodSelector}>
          {(['week', 'month', 'year'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}
              >
                {period === 'week' ? 'Semaine' : period === 'month' ? 'Mois' : 'Année'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Statistiques */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
          <View style={styles.statsGrid}>
            {adminStats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </View>
        </View>

        {/* Actions rapides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </View>
        </View>

        {/* Éléments en attente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>En attente de traitement</Text>
          {pendingItems.map((item) => (
            <PendingCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
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
  headerContent: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#ffffff',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  periodButtonTextActive: {
    color: '#2563EB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    minWidth: '47%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    minWidth: '47%',
    minHeight: 120,
    justifyContent: 'space-between',
  },
  actionIcon: {
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  pendingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  pendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pendingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pendingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  pendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  pendingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  pendingDate: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
  },
  unauthorizedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  unauthorizedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  unauthorizedText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});