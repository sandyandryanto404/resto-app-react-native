import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const ForgotPasswordScreen = () => {
   return (
      <SafeAreaView style={styles.root}>
          <Text>Forgot Password</Text>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   root: {
      flex: 1,
   },
})

export default ForgotPasswordScreen;