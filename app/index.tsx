import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌱 SOS Natureza</Text>
        <View style={styles.authButtons}>
          <Link href="/cadastro" asChild>
            <Button title="Cadastro" color="#388E3C" />
          </Link>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>

        <Animated.View entering={FadeInDown.delay(100)} style={styles.imageWrapper}>
          <Image
            source={require('../assets/save-the-planet.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.Text entering={FadeInDown.delay(300)} style={styles.description}>
          Este projeto tem como objetivo ajudar na proteção do meio ambiente,
          permitindo que qualquer pessoa denuncie problemas como desmatamento,
          queimadas ilegais, poluição e alagamentos. Sua colaboração é essencial
          para construirmos um futuro mais sustentável!
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(500)} style={styles.buttonContainer}>
          <Link href="novaDenuncia" asChild>
            <Button title="Fazer Nova Denúncia" color="#388E3C" />
          </Link>

          <View style={styles.spacing} />

          <Link href="/denuncias" asChild>
            <Button title="Ver Denúncias" color="#2E7D32" />
          </Link>

          <View style={styles.spacing} />

          <Link href="/mapa" asChild>
            <Button title="Ver localização" color="#2E7D32" />
          </Link>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    marginTop: 30
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#C8E6C9',
    borderBottomWidth: 1,
    borderColor: '#A5D6A7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  imageWrapper: {
    width: 220,
    height: 220,
    marginBottom: 50,
    marginTop: -100
  },
  image: {
    width: '100%',
    height: '100%',
    
  },
  authButtons: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  container: {
    padding: 24,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'justify',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  spacing: {
    height: 16,
  },
});