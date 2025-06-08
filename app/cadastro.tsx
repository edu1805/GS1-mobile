import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useRouter } from "expo-router";

export default function CadastroScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUsuarioId } = useUser();
  const router = useRouter();

  const handleCadastro = async () => {
    try {
      const response = await axios.post(
        "http://52.225.227.247:5000/api/Usuario/create",
        { name, email, password }
      );

      if (response.status === 200 || response.status === 201) {
        const id = response.data.id;
        setUsuarioId(id);
        Alert.alert("Cadastro realizado com sucesso!");
        router.push("/");
      } else {
        Alert.alert("Erro ao cadastrar", "Verifique os dados e tente novamente.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro de resposta:", error.response?.data);
        console.log("Status:", error.response?.status);
        Alert.alert("Erro no cadastro", "Por favor, tente novamente.");
      } else {
        console.log("Erro inesperado:", error);
        Alert.alert("Erro inesperado", "Algo deu errado.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#7E7E7E"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#7E7E7E"
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#7E7E7E"
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.menuButton]}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>Voltar ao Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 28,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#A5D6A7",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#388E3C",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  menuButton: {
    backgroundColor: "#2E7D32",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
