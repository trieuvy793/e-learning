import React, { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import RenderHTML from 'react-native-render-html';
import IdeCode from '../IDE/IdeCode'; // Đây là component để hiển thị mã màu sắc
import he from 'he';
import { ScrollView } from 'react-native-gesture-handler';

export default function ContentItem({ description, output }) {
  const { width } = useWindowDimensions();
  const [isRun, setIsRun] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (description) {
      // Tìm vị trí của chuỗi `<pre><code><code>`
      const startIndex = description.indexOf('<pre><code><code>');
      if (startIndex !== -1) {
        const endIndex = description.indexOf('</code></code></pre>');
        // Lấy ra đoạn văn bản được bao bọc trong thẻ `<pre><code><code>`
        let desiredText = description.substring(startIndex + 17, endIndex);
        desiredText = he.decode(desiredText);
        setCode(desiredText);
      }
    }
  }, [description]);

  const descriptionSource = {
    html: description
  };

  const outputSource = {
    html: output
  };

  return (
    <View>
      {code ? (
        <View>
        <ScrollView style={{maxHeight: 400, marginBottom: 20 }}>
          <IdeCode initialValue={code} onCodeChange={setCode} readOnly={true}/>
        </ScrollView>
        <TouchableOpacity onPress={() => setIsRun(true)}>
            <Text style={{ padding: 12, backgroundColor: "#C6D6FF", borderRadius: 10, fontSize: 15, fontWeight: 'bold', textAlign: 'center', width: 100 }}>Run</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <RenderHTML
          contentWidth={width}
          source={descriptionSource}
          tagsStyles={tagStyles}
        />
      )}

      {isRun && (
        <>
          <Text style={{ fontWeight: 500, fontSize: 18, marginTop: 20 }}>Output</Text>
          <RenderHTML
            contentWidth={width}
            source={outputSource}
            tagsStyles={outputStyles}
          />
        </>
      )}
    </View>
  );
}

const tagStyles = {
  body: {
    fontSize: 14
  },
  code: {
    backgroundColor: 'black',
    color: 'white',
    padding: 20,
    borderRadius: 10
  }
};

const outputStyles = {
  body: {
    fontSize: 10
  },
  code: {
    backgroundColor: 'black',
    color: 'white',
    padding: 20,
    borderRadius: 10
  }
};
