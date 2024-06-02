import { React,  useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
import DashboardScreen from "./DashboardScreen";
import OrderScreen from "./OrderScreen";
import MenuScreen from "./MenuScreen";

const WelcomeScreen = () => {

    const Tab = createBottomTabNavigator();
    const [pending, setPending] = useState(0);

    useEffect(() => { 
        setPending(2)
    })

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarLabelPosition: "below-icon",
                tabBarShowLabel: true,
                tabBarActiveTintColor:"#FF8C00",
            }}
        >
            <Tab.Screen 
                name="Dashboard" 
                component={DashboardScreen} 
                options={{
                    headerTitleAlign:"center",
                    tabBarLabel:"Dashboard",
                    tabBarIcon: ({ color })=> <Ionicons name="speedometer" size={20} color={color}  />,
                }}
            />
            <Tab.Screen 
                name="Order" 
                component={OrderScreen} 
                options={{
                    headerTitleAlign:"center",
                    tabBarLabel:"Order",
                    tabBarIcon: ({ color })=> <Ionicons name="document-text" size={20} color={color}  />,
                    tabBarBadge: pending,
                }}
            />
            <Tab.Screen 
                name="Menu" 
                component={MenuScreen} 
                options={{
                    headerTitleAlign:"center",
                    tabBarLabel:"Menu",
                    tabBarIcon: ({ color })=> <Ionicons name="fast-food" size={20} color={color}  />
                }}
            />
        </Tab.Navigator>
    )
}

export default WelcomeScreen;