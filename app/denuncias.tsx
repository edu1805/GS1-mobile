import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function ListaDenuncias() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>📋 Lista de Denúncias</Text>
      {/* Aqui você pode listar as denúncias armazenadas */}
      <Link href="/denuncias/mapa">Ver no Mapa</Link>
    </View>
  );
}
