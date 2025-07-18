import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.spinner, animatedStyle]}>
        <LinearGradient
          colors={['#2563EB', '#7C3AED', '#F97316']}
          style={[styles.gradient, { width: size, height: size, borderRadius: size / 2 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={[styles.inner, { 
          width: size - 4, 
          height: size - 4, 
          borderRadius: (size - 4) / 2 
        }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
  },
  inner: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 2,
    left: 2,
  },
});