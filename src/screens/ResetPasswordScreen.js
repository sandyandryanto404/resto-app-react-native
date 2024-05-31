import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const ResetPasswordScreen = () => {
   return (
      <SafeAreaView style={styles.root}>
          <Text>Reset Password</Text>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   root: {
      flex: 1,
   },
})

export default ResetPasswordScreen;