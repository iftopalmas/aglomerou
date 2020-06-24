import { REACT_NATIVE_GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'

export default {
    name: "Aglomerou",
    slug: "Aglomerou",
    platforms: [
      "ios",
      "android",
      "web"
    ],
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "br.edu.ifto.aglomerou",
      supportsTablet: true,
      config: {
        googleMapsApiKey: REACT_NATIVE_GOOGLE_MAPS_API_KEY
      }
    },
    android: {
      package: "br.edu.ifto.aglomerou",
      config: {
        googleMaps: {
          apiKey: REACT_NATIVE_GOOGLE_MAPS_API_KEY
        }
      }
    }
}