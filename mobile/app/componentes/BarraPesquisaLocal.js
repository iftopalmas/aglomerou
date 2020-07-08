import React, { useState } from 'react';
import { REACT_NATIVE_GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function BarraPesquisa({ moverMapa }) {
  const [searchFocused, setSearchfocused] = useState(false);

  return (
    <GooglePlacesAutocomplete
      placeholder="Aglomerou onde?"
      placeholderTextColor="#326002"
      onPress={(data, details) => {
        moverMapa(details.geometry.location);
      }}
      query={{
        key: REACT_NATIVE_GOOGLE_MAPS_API_KEY,
        language: 'pt-BR',
        components: 'country:br',
      }}
      textInputProps={{
        onFocus: () => {
          setSearchfocused(true);
        },
        onBlur: () => {
          setSearchfocused(false);
        },
        autoCapitalize: 'none',
        autoCorrect: false,
      }}
      listViewDisplayed={searchFocused}
      fetchDetails
      enablePoweredByContainer={false}
      styles={styles}
    />
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: 40,
    alignItems: 'center',
    width: '96%',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 56,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
  },
  textInput: {
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,

    fontSize: 16,
    color: '#326002',
  },
  listView: {
    backgroundColor: '#fff',
    marginTop: 8,
    borderRadius: 8,

    width: '96%',
  },
  description: {
    fontSize: 14,
  },
  row: {
    paddingHorizontal: 8,
    height: 48,
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#326002',
    opacity: 0.1,
  },
};
