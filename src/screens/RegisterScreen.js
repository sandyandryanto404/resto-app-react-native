import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const RegisterScreen = () => {
   return (
      <SafeAreaView style={styles.root}>
          <Text>Register</Text>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   root: {
      flex: 1,
   },
})

export default RegisterScreen;