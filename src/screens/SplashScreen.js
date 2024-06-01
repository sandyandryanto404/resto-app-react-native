import { React, useEffect, useState  } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/logo.png"

const SplashScreen = () => {

    const [info, setInfo] = useState('');

    const navigation = useNavigation();

    const loadContent = () => {
        navigation.navigate('Login')
    }

    useEffect(() => { 
        setInfo("Please Wait.....")
        setTimeout(() => { 
            loadContent();
        }, 3000)
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FCF3CF', justifyContent: 'center' }}>
            <View style={styles.container}>

            

            <Image 
                source={Logo}
                style={styles.image}
                alt="Logo"
              />

              <Text style={styles.title}>{info}</Text>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1e1e1e',
        marginBottom: 10,
        textAlign: 'center',
    },
})

export default SplashScreen;