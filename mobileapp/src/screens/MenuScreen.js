import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet,  TouchableOpacity, Alert, ToastAndroid  } from "react-native";
import CardMenu from "../components/CardMenu";
import defaultData  from "../seeds/Menu.json"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const MenuScreen = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => { 
        setLoading(true)
        setTimeout(() => {
            setData(defaultData)
         }, 3000)
    }, [])

    const handleEdit = (item) => {
        navigation.navigate('FormMenuScreen', { menu: item, type: 'edit' })
    }

    const handleDelete = (item) => {
        Alert.alert('Delete Confirmation', 'Are you sure you want to delete this item with name '+item.name+' ?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { 
                text: 'Yes, delete it!', 
                onPress: () => {
                    ToastAndroid.show('Success, your item has been deleted !', ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
            },
        ]);
    }

    const handleCreate = () => {
        navigation.navigate('FormMenuScreen', { menu: {}, type: 'create' })
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

export default MenuScreen;