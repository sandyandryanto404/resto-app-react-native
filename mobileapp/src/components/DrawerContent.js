import React, { useState, useEffect } from "react";
import {View, StyleSheet, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageMale from "../../assets/male.png"

const DrawerList = [
  {icon: 'home-outline', label: 'Home', navigateTo: 'Welcome'},
  {icon: 'account', label: 'My Profile', navigateTo: 'My Profile'},
  {icon: 'lock', label: 'Change Password', navigateTo: 'Change Password'},
];
const DrawerLayout = ({icon, label, navigateTo}) => {
    
  const navigation = useNavigation();

  return (
    <DrawerItem
      icon={({color, size}) => <Icon name={icon} color={color} size={size} />}
      label={label}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = props => {
    return DrawerList.map((el, i) => {
      return (
        <DrawerLayout
          key={i}
          icon={el.icon}
          label={el.label}
          navigateTo={el.navigateTo}
        />
      );
    });
  };

const DrawerContent = (props) => {

    const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
  
    useEffect(() => { 
        
        setFirstName("Sandy")
        setLastName("Andryanto")
        setEmail("sandy.andryanto404@gmail.com")
        
      }, [])

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <TouchableOpacity activeOpacity={0.8}>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                        source={ImageMale}
                        size={50}
                        style={{marginTop: 5}}
                    />
                    <View style={{marginLeft: 10, flexDirection: 'column'}}>
                        <Title style={styles.title}>{firstName} {lastName}</Title>
                        <Text style={styles.caption} numberOfLines={1}>
                           {email}
                        </Text>
                    </View>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={styles.drawerSection}>
                <DrawerItems />
                </View>
            </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
            <DrawerItem
                icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
                )}
                label="Sign Out"
                onPress={() => {
                    navigation.navigate("Login");
                }}
            />
            </View>
        </View>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    // color: '#6e6e6e',
    width: '100%',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    borderBottomWidth: 0,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});