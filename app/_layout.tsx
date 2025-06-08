import { Drawer } from "expo-router/drawer";
import { UserProvider } from "../context/UserContext";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function Layout() {
  return (
    <UserProvider>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Início",
            drawerLabel: "Início",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="denuncias"
          options={{
            title: "Denúncias",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="report" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="cadastro"
          options={{
            title: "Cadastro de Usuário",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="person-add" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="novaDenuncia"
          options={{
            title: "Nova Denúncia",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="add-alert" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="mapa"
          options={{
            title: "Mapa",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="map-marked-alt" size={size} color={color} />
            ),
          }}
        />

        {/* Editar denúncia é rota dinâmica, não precisa estar no menu */}
      </Drawer>
    </UserProvider>
  );
}
