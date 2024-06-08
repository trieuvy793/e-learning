// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, View, TouchableOpacity, Text, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
// import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
// import { MaterialCommunityIcons, Ionicons, AntDesign, Zocial } from '@expo/vector-icons';

// const IdeSuper = ({ initialValue, readOnly = false }) => {
//     const [code, setCode] = useState(initialValue);
//     const [keyboardOpen, setKeyboardOpen] = useState(false);
//     const codeRef = useRef(null);

//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//             setKeyboardOpen(true);
//         });
//         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardOpen(false);
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     const handleChange = (newCode) => {
//         setCode(newCode);
//         // console.log(code);
//     };

//     const handleRunCode = () => {
//         // console.log(code);
//     };

//     // const insertCharacter = (character) => {
//     //     const updatedCode = code + character;
//     //     handleChange(updatedCode);
//     // };

//     const toggleKeyboard = () => {
//         Keyboard.dismiss();
//     };

//     return (
//         <KeyboardAvoidingView
//             style={styles.container}
//             behavior={Platform.OS === 'ios' ? 'padding' : null}
//             keyboardVerticalOffset={Platform.OS === 'ios' ? 22 : 0} // Điều chỉnh offset nếu cần
//         >
//             <View style={styles.editorContainer}>
//                 <CodeEditor
//                     ref={codeRef}
//                     style={styles.editor}
//                     language="python3"
//                     initialValue={code}
//                     syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
//                     showCursor={true}
//                     showLineNumbers
//                     onChange={handleChange}
//                     readOnly={readOnly}
//                 />
//             </View>
//             {keyboardOpen && (
//                 <View style={styles.toolbar}>
//                     <TouchableOpacity onPress={() => {
//                         handleChange();
//                         handleRunCode();
//                     }}>
//                         <View>
//                             <Zocial name="googleplay" size={24} color="black" />
//                         </View>
//                     </TouchableOpacity>
//                     {/* <TouchableOpacity onPress={() => insertCharacter('{')}>
//                         <Text>{'{'}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => insertCharacter('}')}>
//                         <Text>{'}'}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => insertCharacter('|')}>
//                         <Text>{'|'}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => insertCharacter('<')}>
//                         <Text>{'<'}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => insertCharacter('>')}>
//                         <Text>{'>'}</Text>
//                     </TouchableOpacity> */}
//                     <TouchableOpacity onPress={toggleKeyboard}>
//                         <Text>{'Hide'}</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     editorContainer: {
//         flex: 1,
//     },
//     toolbar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 8,
//         backgroundColor: '#f0f0f0',
//         borderTopWidth: 1,
//         borderTopColor: '#ccc',
//     },
//     editor: {
//         flex: 1,
//         fontSize: 12,
//         inputLineHeight: 12,
//         highlighterLineHeight: 12,
//         padding: 16,
//         minWidth: '100%'
//     },
// });

// export default IdeSuper;


import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Keyboard, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { MaterialCommunityIcons, Ionicons, AntDesign, Zocial } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import executePythonCode from '../../Services/apiRequests';
import { encode as base64Encode, decode as base64Decode } from 'base-64';

const IdeSuper = ({ initialValue, readOnly = false, onCodeChange }) => {
    const [code, setCode] = useState(initialValue);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const codeRef = useRef(null);
    const [response, setResponse] = useState(null);
    const { width } = useWindowDimensions();
    const lang = 'python3';

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardOpen(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOpen(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleChange = (newCode) => {
        setCode(newCode);
        onCodeChange(newCode);
    };

    const handleRunCode = async () => {
        try {
            const dataInput = "";
            const responsePromise = await executePythonCode(lang, code, dataInput);
            responsePromise.stdout = base64Decode(responsePromise.stdout);
            setResponse(responsePromise);
            Keyboard.dismiss();
        } catch (error) {
            console.error(error);
        }
    };

    const formatCodeAsHtml = (code) => {
        const escapedCode = code
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\n/g, ' <br> ')
            .replace(/ /g, '&nbsp;');
        return `<pre>${escapedCode}</pre>`;
    };

    const toggleKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 22 : 0}
        >
            <View style={styles.editorContainer}>
                <CodeEditor
                    ref={codeRef}
                    style={styles.editor}
                    language="python3"
                    initialValue={code}
                    syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
                    showCursor={true}
                    showLineNumbers
                    onChange={handleChange}
                    readOnly={readOnly}
                />
            </View>
            {keyboardOpen && (
                <View style={styles.toolbar}>
                    <TouchableOpacity onPress={handleRunCode}>
                        <View>
                            <Zocial name="googleplay" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleKeyboard}>
                        <Text>{'Hide'}</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!keyboardOpen && code !== "" && (
                <View style={styles.resultContainer}>
                    <RenderHtml
                      contentWidth={width}
                      source={{
                        html: `
                        <pre style="font-family: 'Arial', sans-serif; color: white;">${response && response.stdout ? response.stdout.replace(/</g, "&lt;").replace(/\n/g, '<br>') : ''}</pre>`
                      }}
                      ignoredDomTags={['font', 'int']}
                    />
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    editorContainer: {
        flex: 1,
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    editor: {
        flex: 1,
        fontSize: 12,
        inputLineHeight: 12,
        highlighterLineHeight: 12,
        padding: 16,
        minWidth: '100%',
    },
    resultContainer: {
        height: "33.33%",
        backgroundColor:'black'
    },
    resultText: {
        color:'white'
    }
});

export default IdeSuper;
