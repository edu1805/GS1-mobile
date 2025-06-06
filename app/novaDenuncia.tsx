import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function NovaDenunciaScreen() {
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const usuarioId = 1; // ← Substituir depois com ID real do usuário logado

  const router = useRouter();

  const handleSubmit = async () => {
    if (!descricao || !categoria) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      await axios.post('http://SEU_BACKEND/api/denuncias', {
        usuarioId,
        descricao,
        categoria,
      });

      Alert.alert('Sucesso', 'Denúncia enviada com sucesso!');
      router.replace('/');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar a denúncia.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Denúncia</Text>

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Desmatamento, Poluição"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o que aconteceu..."
        multiline
        numberOfLines={4}
        value={descricao}
        onChangeText={setDescricao}
      />

      <View style={styles.button}>
        <Button title="Enviar Denúncia" color="#388E3C" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#E8F5E9',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 16,
  },
});
