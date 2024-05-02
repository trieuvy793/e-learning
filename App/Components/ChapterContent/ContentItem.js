import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import RenderHTML from 'react-native-render-html';
import Colors from '../../../assets/colors/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ContentItem({ description, output }) {
  const { width } = useWindowDimensions();
  const [isRun, setIsRun] = useState(false);
  const descriptionSource = {
    html: description
  }
  const outputSource = {
    html: output
  }
  return description && (
    <View>
      <RenderHTML
        contentWidth={width}
        source={descriptionSource}
        tagsStyles={tagStyles}
      />
      {output != null ? <TouchableOpacity
        onPress={() => setIsRun(true)}
      >
        <Text style={{ padding: 12, backgroundColor: "#C6D6FF", borderRadius: 10, fontSize: 15, fontWeight:'bold', textAlign: 'center', width: 100 }}>Run</Text>
      </TouchableOpacity> : null}

      {isRun ?
        <>
          <Text style={{ fontWeight: 500, fontSize: 18, marginTop: 20 }}>Output</Text>
          <RenderHTML
            contentWidth={width}
            source={outputSource}
            tagsStyles={tagStyles}
          />
        </>
        : null}
    </View>
  )
}

const tagStyles = {
  body: {
    fontSize: 16
  },
  code: {
    backgroundColor: 'black',
    color: 'white',
    padding: 20,
    borderRadius: 10
  }
}