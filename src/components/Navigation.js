import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen"
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"
import ResetPasswordScreen from "../screens/ResetPasswordScreen"
import HomeScreen from "../screens/HomeScreen"
import SplashScreen from "../screens/SplashScreen"
import FormMenuScreen from "../screens/FormMenuScreen";

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="FormMenuScreen" component={FormMenuScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation