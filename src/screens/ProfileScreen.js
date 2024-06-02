import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import ImageMale from "../../assets/male.png";
import ImageFemale from "../../assets/female.png"
import country from 'country-list-js'

const ProfileScreen = () => {

  const [form, setForm] = useState({
      email: '',
      gender:'',
      country: '',
      phone: '',
      first_name: '',
      last_name: '',
      address:'',
      about_me: '',
  });

  const [countries, setCountries] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const genders = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];

  const navigation = useNavigation();

  const onUpdateProfile = () => {
      navigation.navigate('Home')
  }
  
  const onLogOut = () => {
    navigation.navigate('Login')
  }
  
  const countryData = () => {
     let data = []
     let countries = country.names().sort()
     countries.map((row) => {
         let obj = {
            label: row,
            value: row
         }
         data.push(obj)
     })
     return data
  }

  useEffect(() => { 
    let countries = countryData()
    
    setTimeout(() => { 
        setCountries(countries)
    }, 3000)
    
  }, [])

 return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FCF3CF' }}>
       <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.form}>

                { form.gender !== '' ? <>
                
                    <Image 
                      source={form.gender === 'M' ? ImageMale : ImageFemale}
                      style={styles.headerImg}
                      alt="Logo"
                    />
                
                </> : <></> }

              

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      style={styles.inputControl}
                      placeholder="john.doe@example.com"
                      placeholderTextColor="#6b7288"
                      value={form.email}
                      onChangeText={email => setForm({... form, email})}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <TextInput
                      style={styles.inputControl}
                      placeholder="1234567890"
                      placeholderTextColor="#6b7288"
                      value={form.phone}
                      onChangeText={phone => setForm({... form, phone})}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                      style={styles.inputControl}
                      placeholder="John"
                      placeholderTextColor="#6b7288"
                      value={form.first_name}
                      onChangeText={first_name => setForm({... form, first_name})}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                      style={styles.inputControl}
                      placeholder="Doe"
                      placeholderTextColor="#6b7288"
                      value={form.last_name}
                      onChangeText={last_name => setForm({... form, last_name})}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Gender</Text>
                  
                  <Dropdown
                    style={[stylesDropdown.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={stylesDropdown.placeholderStyle}
                    selectedTextStyle={stylesDropdown.selectedTextStyle}
                    inputSearchStyle={stylesDropdown.inputSearchStyle}
                    iconStyle={stylesDropdown.iconStyle}
                    data={genders}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Gender' : '...'}
                    searchPlaceholder="Search..."
                    value={form.gender}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setForm({... form, gender: item.value})
                      setIsFocus(false);
                    }}
                  />

                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Country</Text>

                  <Dropdown
                    style={[stylesDropdown.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={stylesDropdown.placeholderStyle}
                    selectedTextStyle={stylesDropdown.selectedTextStyle}
                    inputSearchStyle={stylesDropdown.inputSearchStyle}
                    iconStyle={stylesDropdown.iconStyle}
                    data={countries}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Country' : '...'}
                    searchPlaceholder="Search..."
                    value={form.country}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setForm({... form, country: item.value})
                      setIsFocus(false);
                    }}
                  />
                  
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Address</Text>
                  <TextInput
                      style={styles.inputControlTextArea}
                      placeholder="Example Street 23"
                      placeholderTextColor="#6b7288"
                      value={form.address}
                      multiline = {true}
                      numberOfLines = {4}
                      onChangeText={address => setForm({... form, address})}
                      
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>About Me</Text>
                  <TextInput
                      style={styles.inputControlTextArea}
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                      placeholderTextColor="#6b7288"
                      value={form.about_me}
                      multiline = {true}
                      numberOfLines = {4}
                      onChangeText={about_me => setForm({... form, about_me})}
                      
                  />
                </View>
                <View style={styles.formAction}>
                    <TouchableOpacity onPress={onUpdateProfile}>
                      <View style={styles.btn}>
                          <Text style={styles.btnText}>
                             Update Profile
                          </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onLogOut}>
                      <View style={styles.btnLogOut}>
                          <Text style={styles.btnText}>
                             Sign Out
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
    container: {
        padding: 24,
        flex: 1,
    },
    header:{
      marginVertical: 36,
    },
    headerImg: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginBottom: 36,
    },
    title: {
      fontSize: 27,
      fontWeight: '700',
      color: '#1e1e1e',
      marginBottom: 6,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: '#616A6B',
      textAlign: 'center',
    },
    form: {
      marginBottom: 24,
      flex: 1,
    },
    formAction: {
      marginVertical: 24,
    },
    formFooter: {
      fontSize: 17,
      fontWeight: '600',
      color: '#222',
      textAlign: 'center',
      letterSpacing: 0.15,
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
    btn: {
      backgroundColor: '#F1C40F',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#FCF3CF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    btnLogOut: {
      backgroundColor: '#dc3545',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#dc3545',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
    },
});

export default ProfileScreen;