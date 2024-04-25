import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChatGPT = () => {
    const [data, setData] = useState([]);
    const [textInput, setTextInput] = useState('');
    const navigate = useNavigation();
    const apiKey = '44a9e9e889msh5af9ac4cd38f353p16fff1jsnb4364defb1bc';
    const apiUrl = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
    const windowWidth = Dimensions.get('window').width;

    const handleSend = async () => {        
        try {
            const answer = "híidfjsiifsifjidsjcjffhbdsjfhusdhfiehjifjndsjkfnkssidjfisj";
            setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: answer }]);
            setTextInput('');
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const renderMessage = ({ item }) => {
        return (
            <View style={[styles.messageContainer, item.type === 'user' ? styles.userContainer : styles.botContainer]}>
                <Text style={[styles.messageText, item.type === 'user' ? styles.userText : styles.botText]}>{item.text}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.inner}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom:20 }}>
                    <TouchableOpacity onPress={() => navigate.goBack()}>
                        <Feather name="x" size={24} color="black" style={{ paddingLeft: 10 }} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Chat room</Text>
                    <Text style={{color:'#C6D6FF'}}>......</Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.body}
                    renderItem={renderMessage}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={textInput}
                        onChangeText={(text) => setTextInput(text)}
                        placeholder="Ask me anything..."
                    />
                    <TouchableOpacity style={styles.buttonPosition} onPress={handleSend}>
                        <Ionicons name="send-sharp" size={24} color="#18A0FB" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatGPT;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C6D6FF',
    },
    inner: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    body: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    input: {
        borderWidth: 1,
        borderColor: '#18A0FB',
        width: '90%',
        padding: 10,
        marginBottom: 20,
        marginTop:10,
        borderRadius: 96,
        paddingLeft: 18
    },
    buttonPosition: {
        position: 'absolute',
        right: 40,
        top: '28%'
    },
    messageContainer: {
        maxWidth: '80%',
        borderRadius:14,
        marginTop:20,
        marginBottom:2,
        marginHorizontal:20
    },
    userContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#C6D6FF',
        borderTopRightRadius: 0,
    },
    botContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#F4F4F4',
        borderTopLeftRadius: 0,
    },
    messageText: {
        padding: 14,
        borderRadius: 14,
        fontSize: 16
    },
    userText: {
        backgroundColor: '#C6D6FF',
    },
    botText: {
        backgroundColor: '#F4F4F4',
    },
});
