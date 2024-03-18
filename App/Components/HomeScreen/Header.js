import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import Coin from './../../../assets/images/coin.jpg';
import { Ionicons } from '@expo/vector-icons';
import { UserPointsContext } from '../../Context/UserPointsContext'
import { GetPoint } from '../../Services/getPoint';

export default function Header() {
  const {isLoaded, isSignedIn, user} = useUser();
  const point = GetPoint();
  console.log("header", point)
  return isLoaded &&(
    <View>
      <View style={[{justifyContent:'space-between'},styles.rowStyle]}>
        <View style={styles.rowStyle}>
          <Image source={{uri:user?.imageUrl}}
          style={{width:50, height:50, borderRadius:99}}/>
          <View>
            <Text style={{color:Colors.WHITE}}>Welcome,</Text>
            <Text style={styles.mainText}>{user?.fullName}</Text>
          </View>
        </View>
        <View style={styles.rowStyle}>
          <Image source={Coin} style={{width:35, height:35, borderRadius:99}}/>
          <Text style={styles.mainText}>{point}</Text>
        </View>
      </View>
      <View style={[{backgroundColor:Colors.WHITE, paddingLeft:20, paddingRight:5, marginTop:25,justifyContent:'space-between', borderRadius:99}, styles.rowStyle]}>
        <TextInput placeholder='Search Courses' style={{fontSize:18}}/>
        <Ionicons name="search-circle" size={50} color={Colors.PRIMARY} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainText:{
    color:Colors.WHITE, 
    fontSize:20
  },
  rowStyle:{
    display:'flex', 
    flexDirection:'row', 
    gap:10, 
    alignItems:'center'
  }
})
