import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/logo.png"

const ForgotPasswordScreen = () => {

  const [form, setForm] = useState({
    email: ''
 });

 const navigation = useNavigation();

 const onResetPassword = () => {
   navigation.navigate('ResetPassword')
 }

 const onLogin = ()=> {
  navigation.navigate('Login')
 }

 return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FCF3CF' }}>
       <SafeAreaView>
        <View style={styles.container}>

            <View style={styles.header}>

              <Image 
                source={Logo}
                style={styles.headerImg}
                alt="Logo"
              />

              <Text style={styles.title}>Forgot Password</Text>

              <Text style={styles.subtitle}>
                  Please complete the form below.
              </Text>

              <Text style={styles.subtitle2}>
                  Enter your email address and we'll send you an email that will allow you reset password.
              </Text>

            </View>

            <View style={styles.form}>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      style={styles.inputControl}
                      placeholder="john.doe@example.com"
                      placeholderTextColor="#6b7288"
                      value={form.email}
                      onChangeText={email => setForm({... form, email})}
                  />
                </View>
                <View style={styles.formAction}>
                    <TouchableOpacity onPress={onResetPassword}>
                      <View style={styles.btn}>
                          <Text style={styles.btnText}>Send Link</Text>
                      </View>
                    </TouchableOpacity>
                </View> 
                <TouchableOpacity
                   style={{ marginTop: 'auto' }}
                   onPress={onLogin}
                >
                  <Text style={styles.formFooter}>
                    <Text style={{ textDecorationLine: 'underline' }}>Remember your password ? Log In</Text>
                  </Text>

                </TouchableOpacity>
            </View>

        </View>
       </SafeAreaView>
    </ScrollView>
 )

}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    },
    header:{
      marginVertical: 36,
    },
    headerImg: {
      width: 80,
      height: 80,
      alignSelf: 'center',
      marginBottom: 36,
    },
    title: {
      fontSize: 27,
      fontWeight: '700',
      color: '#1e1e1e',
      marginBottom: 6,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: '#616A6B',
      textAlign: 'center',
      marginBottom: 24,
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: '400',
      color: '#616A6B',
      textAlign: 'center',
    },
    form: {
      marginBottom: 24,
      flex: 1,
    },
    formAction: {
      marginVertical: 24,
    },
    formFooter: {
      fontSize: 17,
      fontWeight: '600',
      color: '#222',
      textAlign: 'center',
      letterSpacing: 0.15,
    },
    input: {
      marginBottom: 16,
    },
    inputLabel: {
       fontSize: 17,
       fontWeight: '600',
       color: '#222',
       marginBottom: 8,
    },
    inputControl: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    btn: {
      backgroundColor: '#F1C40F',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#FCF3CF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
    },
});

export default ForgotPasswordScreen;