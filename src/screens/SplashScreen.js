import { React, useEffect  } from "react";
import { View, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {

    const navigation = useNavigation();

    const loadContent = () => {
        navigation.navigate('Login')
    }

    useEffect(() => { 
        setTimeout(() => { 
            loadContent();
        }, 3000)
    }, [])

    return (
        <View>
            <Text style={{ fontSize: 24, alignSelf: 'center' }}>
                Loading ....
            </Text>
        </View>
    )
}

export default SplashScreen;