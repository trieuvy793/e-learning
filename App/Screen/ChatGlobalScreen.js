import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CHAT_API_URL = 'https://api.hygraph.com/v2/your_project_id/master';  

const ChatGlobalScreen = () => {
    const [data, setData] = useState([]);
    const [textInput, setTextInput] = useState('');
    const navigate = useNavigation();
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post(CHAT_API_URL, {
                    query: `
                        {
                            messages(orderBy: createdAt_DESC) {
                                id
                                text
                                createdAt
                                type
                            }
                        }
                    `,
                });
                setData(response.data.data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        const interval = setInterval(fetchMessages, 5000);  

        return () => clearInterval(interval);
    }, []);

    const handleSend = async () => {
        if (textInput.trim()) {
            try {
                const response = await axios.post(CHAT_API_URL, {
                    query: `
                        mutation {
                            createMessage(data: {text: "${textInput}", type: "user"}) {
                                id
                                text
                                createdAt
                                type
                            }
                        }
                    `,
                });
                setTextInput('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => navigate.goBack()}>
                        <Feather name="x" size={24} color="black" style={{ paddingLeft: 10 }} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Chat room</Text>
                    <Text style={{ color: '#C6D6FF' }}>......</Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    style={styles.body}
                    renderItem={renderMessage}
                    showsVerticalScrollIndicator={false}
                    inverted
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

export default ChatGlobalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C6D6FF',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    body: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    input: {
        borderWidth: 1,
        borderColor: '#18A0FB',
        width: '90%',
        padding: 10,
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 96,
        paddingLeft: 18,
    },
    buttonPosition: {
        position: 'absolute',
        right: 40,
        top: '28%',
    },
    messageContainer: {
        maxWidth: '80%',
        borderRadius: 14,
        marginTop: 20,
        marginBottom: 2,
        marginHorizontal: 20,
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
        fontSize: 16,
    },
    userText: {
        backgroundColor: '#C6D6FF',
    },
    botText: {
        backgroundColor: '#F4F4F4',
    },
});