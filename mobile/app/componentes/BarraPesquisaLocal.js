import React, { useState } from 'react';
import { REACT_NATIVE_GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function BarraPesquisa({ moverMapa, localizacaoInicial }) {
  const [searchFocused, setSearchfocused] = useState(false);

  return (
    <GooglePlacesAutocomplete
      placeholder="Pesquise aqui"
      placeholderTextColor="#326002"
      onPress={(data, details) => {
        moverMapa(details.geometry.location);
      }}
      query={{
        key: REACT_NATIVE_GOOGLE_MAPS_API_KEY,
        language: 'pt-BR',
        components: 'country:br',
        location: `${localizacaoInicial.latitude}, ${localizacaoInicial.longitude}`,
        radius: 20000,
        types: 'establishment',
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
    top: 20,
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
    color: '#41414d',
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
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#326002',
    opacity: 0.1,
  },
};
