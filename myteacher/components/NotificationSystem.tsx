import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {
  CheckCircle,
  AlertCircle,
  Info,
  X,
} from 'lucide-react-native';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  onPress?: () => void;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const { width } = Dimensions.get('window');

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onDismiss,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color="#10b981" />;
      case 'error':
        return <AlertCircle size={20} color="#ef4444" />;
      case 'warning':
        return <AlertCircle size={20} color="#F59E0B" />;
      case 'info':
      default:
        return <Info size={20} color="#2563EB" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#f0fdf4';
      case 'error':
        return '#fef2f2';
      case 'warning':
        return '#fffbeb';
      case 'info':
      default:
        return '#eff6ff';
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#F59E0B';
      case 'info':
      default:
        return '#2563EB';
    }
  };

  const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const [slideAnim] = useState(new Animated.Value(-width));
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
      // Slide in animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss
      if (notification.duration !== 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, notification.duration || 5000);

        return () => clearTimeout(timer);
      }
    }, []);

    const handleDismiss = () => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss(notification.id);
      });
    };

    return (
      <Animated.View
        style={[
          styles.notification,
          {
            backgroundColor: getBackgroundColor(notification.type),
            borderLeftColor: getBorderColor(notification.type),
            transform: [{ translateX: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.notificationContent}
          onPress={notification.onPress}
          activeOpacity={notification.onPress ? 0.7 : 1}
        >
          <View style={styles.iconContainer}>
            {getIcon(notification.type)}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.message}>{notification.message}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dismissButton} onPress={handleDismiss}>
          <X size={16} color="#6b7280" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 16,
  },
  notification: {
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  dismissButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
});