import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet,  TouchableOpacity,  } from "react-native";
import { Surface } from 'react-native-paper';
import CardMenu from "../components/CardMenu";
import defaultData  from "../seeds/Menu.json"
import { Feather } from '@expo/vector-icons';

const MenuScreen = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => { 
        setLoading(true)
        setTimeout(() => {
            setData(defaultData)
         }, 3000)
    }, [])

    const handleEdit = (item) => {
        console.log(item)
    }

    const handleDelete = (item) => {
        console.log(item)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id + index.toString()}
                refreshing={loading}
                renderItem={({ item }) => (
                    <CardMenu 
                        row={item} 
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item)}
                    />
                )}
            />
             <Surface style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                    <Feather name={"plus"} style={{ color: "#fff",  }} size={24} />
                </TouchableOpacity>
            </Surface>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor:'#eee',
    },
    button: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#0b5ed7',
    },
    buttonText: {
        color: 'white',
    },
    container: {
      flex: 1,
      backgroundColor: '#FCF3CF',
      justifyContent: 'center',
    },
});

export default MenuScreen;