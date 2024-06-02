import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

const CardDasboard = ({ row }) => {
    
    let styleCard = styles.item
    styleCard = {...styleCard, backgroundColor: row.color}
    
    return (
        <Card style={styleCard}>
            <View style={{ flexDirection: 'row',}}>
                <Text style={{ flex:1, lineHeight: 40, padding: 10, color:'#fff' }}>
                    <Ionicons name={row.icon} size={50} />
                </Text>
                <Text style={{ flex:1, fontSize: 35, lineHeight: 45,  color:'#fff', textAlign:'right' }}>{row.total}</Text>
            </View>
            <View style={{ flexDirection: 'row',}}>
                 <Text style={{ flex:1, fontSize: 13,  color:'#fff', textAlign:'right' }}>{row.label}</Text>
            </View>
        </Card>
      )
}

const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    item: {
        padding: 16,
        margin: 16,
        elevation: 4,
        borderRadius: 8,
    },
})

export default CardDasboard;