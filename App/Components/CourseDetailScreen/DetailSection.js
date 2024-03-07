import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import OptionItem from './OptionItem'
import { enrollCourse } from '../../Services'

export default function DetailSection({course, enrollCourse}) {
  return (
    <View style={{ padding: 10, borderRadius: 15, backgroundColor: Colors.WHITE }}>
      <Image source={{ uri: course?.banner?.url }}
        style={{ width: Dimensions.get('screen').width * 0.85, height: 190, borderRadius: 15 }} />

      <View style={{padding:10}}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>{course.name}</Text>

        <View>
          <View style={styles.rowStyle}>
            <OptionItem icon={'book-outline'} value={course.chapters?.length + "Chapters"} />
            <OptionItem icon={'time-outline'} value={course.time} />
          </View>
          <View style={styles.rowStyle}>
            <OptionItem icon={'person-circle-outline'} value={course.author} />
            <OptionItem icon={'cellular-outline'} value={course.level} />
          </View>
        </View>

        <View>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Description</Text>
          <Text style={{lineHeight:22}}>{course?.description?.markdown}</Text>
        </View>

        <View style={{display:'flex',flexDirection:'row',gap:24,justifyContent:'space-evenly'}}>
          <TouchableOpacity 
          onPress={()=>enrollCourse()}
          style={{padding:12,backgroundColor:Colors.PRIMARY,borderRadius:15}}>
            <Text style={{color:Colors.WHITE,textAlign:'center',fontSize:17}}>Enroll For Free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:12,backgroundColor:Colors.LIGHT_PRIMARY,borderRadius:15}}>
            <Text style={{color:Colors.WHITE,textAlign:'center',fontSize:17}}>Membership $2.99/Month</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
})
