import {
  REACT_NATIVE_GOOGLE_MAPS_API_KEY,
  REACT_NATIVE_ADDRESS_API_AGLOMEROU,
} from 'react-native-dotenv';

export default {
  name: 'Aglomerou',
  slug: 'Aglomerou',
  platforms: ['ios', 'android', 'web'],
  version: '1.0.0',
  orientation: 'portrait',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    icon: './assets/ios-icon.png',
    bundleIdentifier: 'br.edu.ifto.aglomerou',
    supportsTablet: true,
    config: {
      googleMapsApiKey: REACT_NATIVE_GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    icon: './assets/android-icon.png',
    package: 'br.edu.ifto.aglomerou',
    config: {
      googleMaps: {
        apiKey: REACT_NATIVE_GOOGLE_MAPS_API_KEY,
      },
    },
    permissions: ['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION'],
  },
  extra: {
    addressApiAglomerou: `${REACT_NATIVE_ADDRESS_API_AGLOMEROU}`,
  },
};
