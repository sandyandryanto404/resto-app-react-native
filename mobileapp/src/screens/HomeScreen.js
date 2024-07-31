import { createDrawerNavigator } from "@react-navigation/drawer";
import { React  } from "react";
import DrawerContent from "../components/DrawerContent"
import WelcomeScreen from "./WelcomeScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import ProfileScreen from "./ProfileScreen";

const HomeScreen = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator 
            initialRouteName="Welcome"
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen 
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerTitleAlign:"center",
                    headerTitle: "",
                }}
            />

            <Drawer.Screen 
                name="My Profile"
                component={ProfileScreen}
                options={{
                    headerTitleAlign:"center",
                }}
            />

            <Drawer.Screen 
                name="Change Password"
                component={ChangePasswordScreen}
                options={{
                    headerTitleAlign:"center",
                }}
            />
        </Drawer.Navigator>
    )
}

export default HomeScreen;