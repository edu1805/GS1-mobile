import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Address = {
  street?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  postalCode?: string | null;
};

export default function Mapa() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [permission, setPermission] = useState<Location.PermissionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermission(status);

      if (status === 'granted') {
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);

        const addressResult = await Location.reverseGeocodeAsync(userLocation.coords);
        if (addressResult.length > 0) {
          setAddress({
            street: addressResult[0].street ?? undefined,
            city: addressResult[0].city ?? undefined,
            region: addressResult[0].region ?? undefined,
            country: addressResult[0].country ?? undefined,
            postalCode: addressResult[0].postalCode ?? undefined
          });
        }
      }
      setLoading(false);
    })();
  }, []);

  if (permission !== 'granted') {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="location-outline" size={60} color="#2e7d32" />
        <Text style={styles.permissionText}>Permissão de localização não concedida</Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setPermission(status);
          }}
        >
          <Text style={styles.permissionButtonText}>Solicitar Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderAddress = () => {
    if (!address) return (
      <View style={styles.addressContainer}>
        <ActivityIndicator size="small" color="#2e7d32" />
        <Text style={styles.loadingText}>Buscando endereço...</Text>
      </View>
    );

    const street = address.street || 'Rua não encontrada';
    const city = address.city || 'Cidade não encontrada';
    const region = address.region || 'Estado não encontrado';
    const country = address.country || 'País não encontrado';
    const postalCode = address.postalCode || 'CEP não encontrado';

    return (
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Endereço completo</Text>
        <View style={styles.addressItem}>
          <Ionicons name="location" size={16} color="#2e7d32" />
          <Text style={styles.addressText}>Rua: {street}</Text>
        </View>
        <View style={styles.addressItem}>
          <Ionicons name="business" size={16} color="#2e7d32" />
          <Text style={styles.addressText}>Cidade: {city}</Text>
        </View>
        <View style={styles.addressItem}>
          <Ionicons name="map" size={16} color="#2e7d32" />
          <Text style={styles.addressText}>Estado: {region}</Text>
        </View>
        <View style={styles.addressItem}>
          <Ionicons name="earth" size={16} color="#2e7d32" />
          <Text style={styles.addressText}>País: {country}</Text>
        </View>
        <View style={styles.addressItem}>
          <Ionicons name="mail" size={16} color="#2e7d32" />
          <Text style={styles.addressText}>CEP: {postalCode}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.loadingText}>Carregando sua localização...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minha Localização</Text>
      </View>

      <View style={styles.content}>
        {location ? (
          <>
            <View style={styles.coordinatesContainer}>
              <View style={styles.coordinateItem}>
                <Ionicons name="navigate" size={20} color="#2e7d32" />
                <Text style={styles.coordinateText}>
                  Latitude: <Text style={styles.coordinateValue}>{location.latitude.toFixed(6)}</Text>
                </Text>
              </View>
              <View style={styles.coordinateItem}>
                <Ionicons name="navigate" size={20} color="#2e7d32" style={{ transform: [{ rotate: '90deg' }] }} />
                <Text style={styles.coordinateText}>
                  Longitude: <Text style={styles.coordinateValue}>{location.longitude.toFixed(6)}</Text>
                </Text>
              </View>
            </View>
            
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
              customMapStyle={mapStyle}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude
                }}
                title="Você está aqui"
              >
                <View style={styles.marker}>
                  <Ionicons name="person" size={24} color="#fff" />
                </View>
              </Marker>
            </MapView>
            
            {renderAddress()}
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2e7d32" />
            <Text style={styles.loadingText}>Obtendo localização...</Text>
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={styles.bottomButton}
        onPress={() => router.push('/')} 
      >
        <Text style={styles.bottomButtonText}>Voltar ao Menu</Text>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
}

const mapStyle = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4', // fundo verde suave
  },
  header: {
    padding: 20,
    backgroundColor: '#2e7d32', // verde escuro
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f0fdf4',
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#4e4e4e',
  },
  permissionButton: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  permissionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  coordinatesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  coordinateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  coordinateText: {
    marginLeft: 10,
    color: '#4e4e4e',
  },
  coordinateValue: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  map: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  addressContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
    textAlign: 'center',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  addressText: {
    marginLeft: 10,
    color: '#4e4e4e',
  },
  marker: {
    backgroundColor: '#2e7d32',
    padding: 5,
    borderRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
  },
  loadingText: {
    marginTop: 10,
    color: '#2e7d32',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  bottomButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});