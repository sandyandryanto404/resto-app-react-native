import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native'
import React from 'react'
import { Card  } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const Button = ({ onPress, style, icon }) => (
    <TouchableOpacity style={style} onPress={onPress}>
      <Feather name={icon} size={24} />
    </TouchableOpacity>
  )

const CardMenu = ({ row }) => {
    
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
                <Image 
                    source={getImage(row.image)}
                    style={styles.image}
                    alt="Menu"
                />
                <View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 32, fontSize: 12, }}>Name</Text>
                        <Text style={styles.labelMenu}>{' : '}{row.name}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 37, fontSize: 12, }}>Price</Text>
                        <Text style={styles.labelMenu}>{' : '}{parseFloat(row.price).toFixed(2)}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 30, fontSize: 12, }}>Status</Text>
                        <Text style={styles.labelMenu}>{' : '}{ parseInt(row.status) === 1 ? 'Active' : 'Inactive' }</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={{ marginRight: 5, fontSize: 12, }}>Description</Text>
                        <Text style={styles.labelMenu}>{' : '}</Text>
                    </View>
                    <View  style={{ flexDirection: 'row', }} >
                        <Text numberOfLines={5} style={{ fontSize: 11, flex: 1, textAlign: 'justify', }}>{row.description}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 40,}}>
                <Button
                    onPress={() => {}}
                    icon="edit-2"
                    style={{ flex:1,}} />
                <Button onPress={() => {}} icon='trash-2' />
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
    image: {
        borderRadius: 12,
        width: 75,
        height: 75,
        alignSelf: 'center',
        marginBottom: 36,
        borderColor: '#000',
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

export default CardMenu;