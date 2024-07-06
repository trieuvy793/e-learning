import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import FullAccess from "./../../assets/images/full-access.png";
import RunFaster from "./../../assets/images/run-faster.png";
import PreviewProject from "./../../assets/images/preview-project.png";
import UnlockColor from "./../../assets/images/unlock-color.png";
import { AntDesign } from '@expo/vector-icons';

export default function PaymentPolicy() {
  const priceMonth = 20000;
  const priceYear = 100000;
  const navigate = useNavigation();
  const data = [
    {id:1, title: 'Unlock full access to the library of 100+ code example', illustrate: FullAccess},
    {id:2, title: 'Run your code 2x faster', illustrate: RunFaster},
    {id:3, title: 'Unlock extra color schemes for the code editor', illustrate: UnlockColor},
    {id:4, title: 'Preview your web and mobile project with the fast refresh', illustrate: PreviewProject}
  ]
  _renderItem = ({item, index}) => {
    return (
      <View className="mt-4">
        <View className="flex-row justify-center mb-4">
          <Image 
            source={item.illustrate} 
            style={{height: Dimensions.get('window').width*0.47, width: Dimensions.get('window').width*0.63}}
            className="rounded-2xl"/>
        </View>
        <Text className="text-center text-xl px-12">{item.title}</Text>
      </View>
  );
  }

  return (
    <View className="bg-BACKGROUND h-full">
      <View>
        <View className="flex-row justify-between items-center mt-2">
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Feather name="x" size={24} color="black" style={{ paddingLeft: 10 }} />
          </TouchableOpacity>
          <Text className="text-xl">Payment Policy</Text>
          <Text className="text-xl text-BACKGROUND">......</Text>
        </View>
        <View className="flex-row justify-center mt-2 pb-2 border-gray-200" style={{borderBottomWidth:1}}>
          <Text className="text-RED text-3xl">Snow</Text>
          <Text className="text-3xl">Code</Text>
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-center text-lg">1-Month-Free Yearly Plan Offer!</Text>
      </View>

      <View>
        <Carousel 
          data={data}
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width*0.7}
          layout={'default'}/>
      </View>

      <View className="flex-row justify-evenly mx-14 mt-8 mb-8">
        <TouchableOpacity onPress={() => navigate.navigate('vnpay', {
            type: "Month",
            price: priceMonth
        })} className="py-4 w-24 border border-blue-400 rounded-lg">
          <Text className="text-center">{priceMonth} VND/ month</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate.navigate('vnpay', {
            type: "Year",
            price: priceYear
        })} className="py-4 w-24 border border-blue-400 rounded-lg">
          <Text className="text-center">{priceYear} VND/ year</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{fontSize:10, textAlign:'center', paddingHorizontal: 10}}>A subscription purchase will be applied to vour Store account since the date of subscription setup.Subscriptions will automatically renew unless canceled within 24-hours before the end of the current period. You can cancel anytime with your Store account settings. For more information, see our Terms of Service and Privacy Policy.</Text>
      </View>

      <View className="flex-row items-center pl-2 absolute bottom-2">
          <AntDesign name="copyright" size={14} color="black" />
          <Text style={{fontSize:14, paddingHorizontal: 10}}>2024 SnowCode. All rights reserved.</Text>
        </View>
    </View>
  )
}