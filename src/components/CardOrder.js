import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native'
import React from 'react'
import { Card  } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const Button = ({ onPress, style, icon }) => (
    <TouchableOpacity style={style} onPress={onPress}>
      <Feather name={icon} size={24} />
    </TouchableOpacity>
  )

const CardOrder = ({ row, onEdit, onDelete, onDetail }) => {
    
    const getImage = (image) => {

        if(image === 'menu-burger.jpg'){
            return require("../../assets/menu-burger.jpg")
        }else if(image === 'menu-cappuccino.jpg'){
            return require("../../assets/menu-cappuccino.jpg")
        }else if(image === 'menu-donut.jpg'){
            return require("../../assets/menu-donut.jpg")
        }else if(image === 'menu-expresso.jpg'){
            return require("../../assets/menu-expresso.jpg")
        }else if(image === 'menu-french-fries.jpg'){
            return require("../../assets/menu-french-fries.jpg")
        }else if(image === 'menu-fried-chicken.jpg'){
            return require("../../assets/menu-fried-chicken.jpg")
        }else if(image === 'menu-milk.jpg'){
            return require("../../assets/menu-milk.jpg")
        }else if(image === 'menu-orange-juice.jpg'){
            return require("../../assets/menu-orange-juice.jpg")
        }else if(image === 'menu-pancake.jpg'){
            return require("../../assets/menu-pancake.jpg")
        }else if(image === 'menu-sandwitch.jpg'){
            return require("../../assets/menu-sandwitch.jpg")
        }

        return require("../../assets/no-image.png")
    }
    
    return (
        <Card style={styles.item}>
            <View style={{ flexDirection: 'row',}}>
                <Feather name="shopping-cart" style={styles.icon} size={60} />
                <View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 32, fontSize: 12, }}>Order Number</Text>
                        <Text style={styles.labelMenu}>{' : '}{row.order_number}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 50, fontSize: 12, }}>Order Date</Text>
                        <Text style={styles.labelMenu}>{' : '}{row.order_date}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 53, fontSize: 12, }}>Total Item</Text>
                        <Text style={styles.labelMenu}>{' : '}{row.total_qty}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 57, fontSize: 12, }}>Sub Total</Text>
                        <Text style={styles.labelMenu}>{' : '}{row.subtotal}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 62, fontSize: 12, }}>Tax (2%)</Text>
                        <Text style={styles.labelMenu}>{' : '}{row.tax}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 46, fontSize: 12, }}>Grand Total</Text>
                        <Text style={styles.labelMenu}>{' : '}{row.grandtotal}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 73, fontSize: 12, }}>Status</Text>
                        <Text style={styles.labelMenu}>{' : '}{row.status === 1 ? 'Paid' : 'Draft'}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 81, fontSize: 12, }}>Note</Text>
                        <Text style={styles.labelMenu}>{' : '}</Text>
                    </View>
                    <View  style={{ flexDirection: 'row', }} >
                        <Text numberOfLines={5} style={{ fontSize: 11, flex: 1, textAlign: 'justify', }}>{row.note}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 40,}}>
                <Button
                    onPress={onDetail}
                    icon="search" style={{ flex:1,}}/>
                <Button
                    onPress={onEdit}
                    style={{ marginRight: 10 }}
                    icon="edit-2"/>
                <Button onPress={onDelete}  icon='trash-2' />
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
    labelMenu: {
        marginRight: 39, 
        fontSize: 12,
    },
    label: {
        flexDirection: 'row', 
        marginBottom: 5,
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 36,
        marginRight: 35,
      },
    item: {
        padding: 16,
        margin: 16,
        elevation: 4,
        borderRadius: 5,
        borderColor: "#eee",
        backgroundColor: "#fff",
    },
})

export default CardOrder;