import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { router, useFocusEffect } from 'expo-router';
import axios from 'axios';
import { useUser } from '../context/UserContext'; 
import { MaterialIcons } from '@expo/vector-icons';

type Denuncia = {
  id: number;
  usuarioId: number;
  descricao: string;
  categoria: string;
  data: string;
};

type Props = {
  denuncia: Denuncia;
  onDelete: (id: number) => void;
};

const DenunciaCard = ({ denuncia, onDelete }: Props) => {
  const dataHora = new Date(denuncia.data);
  const dataFormatada = dataHora.toLocaleDateString('pt-BR');
  const horaFormatada = dataHora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.categoria}>{denuncia.categoria.toUpperCase()}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => router.push(`/editarDenuncia/${denuncia.id}`)}>
            <MaterialIcons name="edit" size={24} color="#1976D2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(denuncia.id)}>
            <MaterialIcons name="delete" size={24} color="#C62828" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.descricao}>{denuncia.descricao}</Text>
      <Text style={styles.data}>{`${dataFormatada} ${horaFormatada}`}</Text>
    </View>
  );
};

export default function ListarDenunciasScreen() {
  const { usuarioId } = useUser(); // usa o id do contexto
  console.log('ID do usuário logado:', usuarioId);
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDenuncias = async () => {
    if (!usuarioId) return; // aguarda ter o id
    try {
      setLoading(true);
      const response = await axios.get(`http://52.225.227.247:5000/api/Denuncia/usuario/${usuarioId}`);
      setDenuncias(response.data);
    } catch (error) {
      console.error('Erro ao buscar denúncias:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDenuncias();
    }, [usuarioId]) // reexecuta se o userId mudar
  );

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir esta denúncia?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`http://52.225.227.247:5000/api/Denuncia/delete/${id}`);
              Alert.alert('Denuncia deletada com sucesso.')
              fetchDenuncias(); 
            } catch (error) {
              console.error('Erro ao deletar denúncia:', error);
              Alert.alert('Erro', 'Não foi possível deletar a denúncia.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Denúncias</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#388E3C" />
      ) : denuncias.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma denúncia cadastrada.</Text>
      ) : (
        <FlatList
          data={denuncias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DenunciaCard denuncia={item} onDelete={handleDelete} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
          <Text style={styles.buttonText}>Voltar ao Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.novaDenuncia]} onPress={() => router.push('/novaDenuncia')}>
          <Text style={styles.buttonText}>Nova Denúncia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#E8F5E9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoria: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 6,
  },
  descricao: {
    fontSize: 16,
    color: '#444',
  },
  data: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
  buttonContainer: {
  marginTop: 20,
  gap: 12,
},

button: {
  backgroundColor: '#388E3C',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},

novaDenuncia: {
  backgroundColor: '#2E7D32',
},

buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
});
