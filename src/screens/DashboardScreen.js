import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet  } from "react-native";
import CardDasboard from "../components/CardDasboard";
import defaultData  from "../seeds/Dashboard.json"

const DashboardScreen = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

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