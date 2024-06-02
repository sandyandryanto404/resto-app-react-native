import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform  } from "react-native";
import CardDasboard from "../components/CardDasboard"

const DashboardScreen = () => {

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const defaultData = [
        {
            id: 1,
            label: "Total Sales",
            color: "#0d6efd",
            icon: "cart",
            total: 10,
        },
        {
            id: 2,
            label: "Total Income",
            color: "#bb2d3b",
            icon: "calculator",
            total: 10,
        },
        {
            id: 3,
            label: "Total Order",
            color: "#157347",
            icon: "documents",
            total: 10,
        },
        {
            id: 4,
            label: "Total Menu",
            color: "#5c636a",
            icon: "fast-food",
            total: 10,
        },
    ];

    useEffect(() => { 
        setLoading(true)
        setTimeout(() => {
            setData(defaultData)
         }, 3000)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id + index.toString()}
                refreshing={loading}
                renderItem={({ item }) => (
                    <CardDasboard row={item} />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCF3CF',
      justifyContent: 'center',
      paddingTop: 10,
    },
    button: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: 'steelblue',
    },
    buttonText: {
      color: 'white'
    },
  });

export default DashboardScreen;