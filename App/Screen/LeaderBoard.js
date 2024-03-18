import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../Services'
import Colors from '../Utils/Colors';
import Gold from './../../assets/images/golden.png'
import Silver from './../../assets/images/silver.png'
import Bronze from './../../assets/images/bronze.png'


export default function LeaderBoard() {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    GetAllUserDetails();
  }, [])

  const GetAllUserDetails = () => {

    GetAllUsers().then(resp => {
      console.log(resp);
      resp && setUserList(resp?.userDetails);
    })
  }

  return (
    <View>
      <View style={{ height: 160, backgroundColor: Colors.PRIMARY, padding: 30 }}>
        <Text style={{ color: Colors.WHITE, fontSize: 30 }}>LeaderBoard</Text>
      </View>

      <View style={{marginTop:-40,height:"85%"}}>
        <FlatList
          data={userList}
          renderItem={({ item, index }) => (
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:20,backgroundColor:Colors.WHITE,margin:8,marginHorizontal:15,borderRadius:15}}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Text style={{ fontWeight: 500, fontSize: 24 }}>{index + 1}</Text>
                <Image source={{ uri: item.profileImage }}
                  style={{ width: 50, height: 50, borderRadius: 50 }} />

                <View>
                  <Text style={{ fontSize: 20 }}>{item.userName}</Text>
                  <Text style={{ fontSize: 16 }}>{item.point} Points</Text>
                </View>
              </View>

              {index<3
              ?<Image source={index+1==1?Gold:index+1==2?Silver:Bronze}
              
              style={{width:40,height:40}}/>
              :null}
            </View>
          )}
        />
      </View>
    </View>
  )
}