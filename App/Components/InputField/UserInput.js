import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

export default function UserInput({ placeholder, isPass, setStatValue, setEmailValidation }) {

  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [icon, setIcon] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleTextChanged = (text) => {
    setValue(text);
    setStatValue(value);

    if (placeholder === 'Email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = emailRegex.test(value);
      // console.log(status);
      setIsEmailValid(status);
      setEmailValidation(status);
    }
  }

  useLayoutEffect(() => {
    switch(placeholder) {
      case "Full Name" :
        return setIcon("person")
      case "Email" :
        return setIcon("mail")
      case "Password" :
        return setIcon("lock")
    }
  })

  return (
    <View className={`bg-white rounded-2xl px-4 py-3 flex-row items-center justify-between space-x-4 my-3 border ${!isEmailValid && placeholder=="Email" && value.length>0 ? "border-RED" : "border-white"}`}>
      <MaterialIcons name={icon} size={24} color="gray" />
      <TextInput
        className="flex-1"
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChanged}
        secureTextEntry={isPass && showPass}
        autoCapitalize='none'
      />

      {isPass && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Entypo name={`${showPass ? "eye" : "eye-with-line"}`} size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  )
}