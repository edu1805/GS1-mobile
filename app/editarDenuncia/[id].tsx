import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';

export default function EditarDenuncia() {
  const { id } = useLocalSearchParams();
  console.log('ID da denuncia:', id);
  
  const router = useRouter();

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDenuncia = async () => {
      try {
        const response = await axios.get(`http://52.225.227.247:5000/api/Denuncia/${id}`);
        setDescricao(response.data.descricao);
        setCategoria(response.data.categoria);
      } catch (error) {
        console.error('Erro ao buscar denúncia:', error);
        Alert.alert('Erro', 'Não foi possível carregar a denúncia.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDenuncia();
  }, [id]);

  const handleSalvar = async () => {
    try {
      await axios.put(`http://52.225.227.247:5000/api/Denuncia/update/${id}`, {
        descricao,
        categoria,
      });

      Alert.alert('Sucesso', 'Denúncia atualizada com sucesso!');
      router.replace('/denuncias');
    } catch (error) {
      console.error('Erro ao atualizar denúncia:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a denúncia.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Denúncia</Text>

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
        <Button title="Salvar Alterações" color="#388E3C" onPress={handleSalvar} />
      </View>

      <View style={styles.navigationButtons}>
        <View style={{ marginTop: 12 }}>
          <Button title="Ver Denúncias" onPress={() => router.replace('/denuncias')} color="#4CAF50" />
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
    marginBottom: 20,
    color: '#1B5E20',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 4,
    marginTop: 12,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    padding: 8,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#A5D6A7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 20,
  },
  navigationButtons: {
    marginTop: 24,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#000',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#000',
  },
});
