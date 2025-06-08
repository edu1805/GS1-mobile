import { Drawer } from "expo-router/drawer";
import { UserProvider } from "../context/UserContext"; 

export default function Layout() {
  return (
    <UserProvider>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{headerShown: false, title: "Início",drawerLabel: "Início",}}
        />
        <Drawer.Screen name="denuncias" />
      </Drawer>
    </UserProvider>
  );
}
