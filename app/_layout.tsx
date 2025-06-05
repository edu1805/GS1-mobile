import { Drawer } from "expo-router/drawer";

export default function Layout(){
    return(
        <Drawer>
            <Drawer.Screen name="index" options={{headerShown:true,title: "Início", drawerLabel: 'Início'}}/>
            <Drawer.Screen name="denuncias"/>
        </Drawer>
    )   
}