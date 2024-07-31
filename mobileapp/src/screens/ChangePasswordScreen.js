import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";

const ChangePasswordScreen = () => {

  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirm: ''
 });

 const onUpdatePassword = () => {
   
 }

 return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FCF3CF' }}>
       <SafeAreaView>
        <View style={styles.container}>

            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Current Password</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.inputControl}
                        placeholder="**********"
                        placeholderTextColor="#6b7288"
                        value={form.current_password}
                        onChangeText={current_password => setForm({... form, current_password})}
                    />
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>New Password</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.inputControl}
                        placeholder="**********"
                        placeholderTextColor="#6b7288"
                        value={form.new_password}
                        onChangeText={new_password => setForm({... form, new_password})}
                    />
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>New Password Confirmation</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.inputControl}
                        placeholder="**********"
                        placeholderTextColor="#6b7288"
                        value={form.new_password_confirm}
                        onChangeText={new_password_confirm => setForm({... form, new_password_confirm})}
                    />
                </View>
                <View style={styles.formAction}>
                    <TouchableOpacity onPress={onUpdatePassword}>
                      <View style={styles.btn}>
                          <Text style={styles.btnText}>
                              Reset Password
                          </Text>
                      </View>
                    </TouchableOpacity>
                </View> 
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
      marginBottom: 8,
    },
    btnLogOut: {
        backgroundColor: '#dc3545',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dc3545',
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

export default ChangePasswordScreen;