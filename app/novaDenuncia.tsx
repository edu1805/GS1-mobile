import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

export default function NovaDenunciaScreen() {
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const { usuarioId } = useUser();

  const router = useRouter();

  const handleSubmit = async () => {
  if (!descricao || !categoria) {
    Alert.alert('Atenção', 'Preencha todos os campos!');
    return;
  }

  if (!usuarioId) {
    Alert.alert('Erro', 'Usuário não autenticado!');
    return;
  }

  try {
    await axios.post('http://52.225.227.247:5000/api/Denuncia/create', {
      usuarioId,
      descricao,
      categoria,
    });

    Alert.alert('Sucesso', 'Denúncia enviada com sucesso!');
    setCategoria('')
    setDescricao('')
    router.replace('/denuncias')
  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Não foi possível enviar a denúncia.');
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Denúncia</Text>

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={setCategoria}
          value={categoria}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Selecione uma categoria',
            value: '',
            color: '#9E9E9E',
          }}
          Icon={() => (
            <MaterialIcons name="arrow-drop-down" size={24} color="#388E3C" />
          )}
          items={[
            { label: 'Lixo', value: 'lixo' },
            { label: 'Desmatamento', value: 'desmatamento' },
            { label: 'Queimada', value: 'queimada' },
            { label: 'Alagamento', value: 'alagamento' },
            { label: 'Poluição', value: 'poluição' },
          ]}
          style={pickerSelectStyles}
        />
      </View>

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
      <View style={styles.navigationButtons}>
        <Button title="Voltar ao Menu" onPress={() => router.replace('/')} color="#2E7D32" />
        <View style={{ marginTop: 12 }}>
          <Button title="Ver Denúncias" onPress={() => router.push('/denuncias')} color="#4CAF50" />
        </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
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
  navigationButtons: {
  marginTop: 32,
},

});

// Custom style para o RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#000',
    backgroundColor: '#fff',
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
  placeholder: {
    color: '#9E9E9E',
  },
});
