import { Tabs } from "expo-router";

export default function UsuarioLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="login"
        options={{ title: "Login", headerTitle: "Login do Usuário" }}
      />
      <Tabs.Screen
        name="cadastro"
        options={{ title: "Cadastro", headerTitle: "Cadastrar Usuário" }}
      />
    </Tabs>
  );
}
