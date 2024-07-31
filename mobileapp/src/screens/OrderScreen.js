import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet,  TouchableOpacity, Alert, ToastAndroid  } from "react-native";
import CardOrder from "../components/CardOrder";
import defaultData  from "../seeds/Order.json"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => { 
        setLoading(true)
        setTimeout(() => {
            setData(defaultData.lists)
         }, 3000)
    }, [])

    const handleEdit = (item) => {
        
    }

    const handleDelete = (item) => {
       
    }

    const handleDetail = (item) => {
       
    }


    const handleCreate = () => {
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id + index.toString()}
                refreshing={loading}
                renderItem={({ item }) => (
                    <CardOrder 
                        row={item} 
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item)}
                        onDetail={() => handleDetail(item)}
                    />
                )}
            />
            <TouchableOpacity style={styles.floatingButton} onPress={handleCreate}>
                <Ionicons name="add-circle" size={80} color="green" />
            </TouchableOpacity>
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
    container: {
      flex: 1,
      backgroundColor: '#FCF3CF',
      justifyContent: 'center',
    },
    floatingButton: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        bottom: 0,
    }
});

export default OrderScreen;