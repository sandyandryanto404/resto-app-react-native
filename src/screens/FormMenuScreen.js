import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, ToastAndroid } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

const FormMenuScreen = ({ route, navigation }) => {

  const { menu, type } = route.params;
  const [buttonSubmit, setButtonSubmit] = useState("")
  const [form, setForm] = useState({
    id: "",
    image:"",
    name: '',
    price: 0,
    description: '',
    status: 0
 });

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

  const [isFocus, setIsFocus] = useState(false);

  const statusOptions = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
  ];

 const onSubmitForm = () => {
    if(type === 'edit'){
        ToastAndroid.show('Success, your item has updated !', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }else{
        ToastAndroid.show('Success, your item has created !', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    navigation.navigate('Menu')
 }

 const onBackToList = () => {
    navigation.navigate('Menu')
 }

 useEffect(() => { 


    if(type === 'edit'){
        setForm(menu)
        setButtonSubmit("Update Menu")
    }else{
        setForm({
            id: "",
            image:"",
            name: '',
            price: 0,
            description: '',
            status: 0,
        })
        setButtonSubmit("Save Menu")
    }
}, [])

 return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FCF3CF' }}>
       <SafeAreaView>
        <View style={styles.container}>

            <Image 
                source={getImage(form.image)}
                style={styles.headerImg}
                alt="Menu"
            />

            <View style={styles.form}>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                      style={styles.inputControl}
                      placeholder="Ramen Noodles"
                      placeholderTextColor="#6b7288"
                      value={form.name}
                      onChangeText={name => setForm({... form, name})}
                  />
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Price</Text>
                  <TextInput
                      keyboardType='numeric'
                      style={styles.inputControl}
                      placeholder="10"
                      placeholderTextColor="#6b7288"
                      value={form.price.toString()}
                      maxLength={10} 
                      onChangeText={price => setForm({... form, price})}
                  />
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Status</Text>
                  <Dropdown
                    style={[stylesDropdown.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={stylesDropdown.placeholderStyle}
                    selectedTextStyle={stylesDropdown.selectedTextStyle}
                    inputSearchStyle={stylesDropdown.inputSearchStyle}
                    iconStyle={stylesDropdown.iconStyle}
                    data={statusOptions}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Status' : '...'}
                    searchPlaceholder="Search..."
                    value={form.status}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setForm({... form, status: item.value})
                      setIsFocus(false);
                    }}
                  />
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Description</Text>
                  <TextInput
                      style={styles.inputControlTextArea}
                      placeholder="Very Delicious Food"
                      placeholderTextColor="#6b7288"
                      value={form.description}
                      multiline = {true}
                      numberOfLines = {4}
                      onChangeText={description => setForm({... form, description})}
                  />
                </View>
                
                <View style={styles.formAction}>
                    <TouchableOpacity onPress={onSubmitForm}>
                      <View style={styles.btn}>
                          <Text style={styles.btnText}>
                              {buttonSubmit}
                          </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onBackToList}>
                      <View style={styles.btnCancel}>
                          <Text style={styles.btnText}>
                              Cancel
                          </Text>
                      </View>
                    </TouchableOpacity>
                </View> 
            </View>

        </View>
       </SafeAreaView>
    </ScrollView>
 )

}

const stylesDropdown = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderRadius: 8,
      paddingHorizontal: 16,
      backgroundColor: "#fff",
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

const styles = StyleSheet.create({
    headerImg: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 16,
        borderColor: "#eee",
        borderRadius: 5,
    },
    container: {
        padding: 24,
        flex: 1,
    },
    header:{
      marginVertical: 36,
    },
    title: {
      fontSize: 27,
      fontWeight: '700',
      color: '#1e1e1e',
      marginBottom: 6,
      textAlign: 'center',
    },
    inputControlTextArea: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        textAlignVertical: 'top',
    },
    form: {
      marginBottom: 24,
      flex: 1,
    },
    formAction: {
      marginVertical: 24,
    },
    input: {
      marginBottom: 16,
    },
    inputLabel: {
       fontSize: 17,
       fontWeight: '600',
       color: '#222',
       marginBottom: 8,
    },
    inputControl: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    btn: {
      backgroundColor: '#157347',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#157347',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    btnCancel: {
        backgroundColor: '#bb2d3b',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#bb2d3b',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
    },
});

export default FormMenuScreen;