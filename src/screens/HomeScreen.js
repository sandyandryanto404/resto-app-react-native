import { createDrawerNavigator } from "@react-navigation/drawer";
import { React  } from "react";
import WelcomeScreen from "./WelcomeScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import ProfileScreen from "./ProfileScreen";
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = () => {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName="Welcome">
            <Drawer.Screen 
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    drawerLabel:"Home",
                    drawerIcon: ({ color })=> <Ionicons name="home" size={20} color={color}  />,
                }}
            />
            <Drawer.Screen 
                name="My Profile"
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ color })=> <Ionicons name="person" size={20} color={color}  />,
                }}
            />
            <Drawer.Screen 
                name="Change Password"
                component={ChangePasswordScreen}
                options={{
                    drawerIcon: ({ color })=> <Ionicons name="lock-closed" size={20} color={color}  />,
                }}
            />
        </Drawer.Navigator>
    )
}

export default HomeScreen;