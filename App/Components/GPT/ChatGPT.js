import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const ChatGPT = () => {
    const [data, setData] = useState([]);
    const [textInput, setTextInput] = useState('');
    const apiKey = '44a9e9e889msh5af9ac4cd38f353p16fff1jsnb4364defb1bc';
    const apiUrl = 'https://simple-chatgpt-api.p.rapidapi.com/ask';

    const handleSend = async () => {
        try {
            const response = await axios.post(apiUrl, {
                question: textInput
            }, {
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
                }
            });

            const answer = response.data.answer;
            setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: answer }]);
            setTextInput('');
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>AI ChatBot</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.body}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red' }}>
                                {item.type === 'user' ? 'You: ' : 'Bot: '}
                            </Text>
                            <Text style={styles.bot}>{item.text}</Text>
                        </View>
                    )}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={textInput}
                        onChangeText={(text) => setTextInput(text)}
                        placeholder="Ask me anything"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSend}>
                        <Text style={styles.buttonText}>Let's Go</Text>
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
        backgroundColor: '#fffcc9',
    },
    inner: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    body: {
        backgroundColor: '#fffcc9',
        width: '100%',
        marginBottom: 20,
    },
    bot: {
        fontSize: 16,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        height: 60,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'yellow',
        width: '90%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
});
