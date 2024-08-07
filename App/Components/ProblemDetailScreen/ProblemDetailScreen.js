'use strict'
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons, Ionicons, AntDesign, Zocial } from '@expo/vector-icons';
import { encode as base64Encode, decode as base64Decode } from 'base-64';
import { GraphQL_LC } from '../../../Configs/config.leetcode';
import executePythonCode from '../../Services/apiRequests';
import IdeCode from '../IDE/IdeCode';
import { COMMUNITY_SOLUTIONS_QUERY, COMMUNITY_SOLUTION_QUERY, QUESTION_CONTENT_QUERY } from '../../Services/queries';

const ProblemDetailScreen = ({ route }) => {
  const { question_id, problem, question__title, difficulty, total_submitted } = route.params;
  const { width } = useWindowDimensions();
  const [problemData, setProblemData] = useState(null);
  const [showDetail, setShowDetail] = useState(true);
  const [solutionsList, setSolutionsList] = useState([]);
  const [showSolutions, setShowSolutions] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [solutionDetail, setSolutionDetail] = useState(null);
  const [getResponse, setResponse] = useState(null);
  const [showIDE, setShowIDE] = useState(false);
  const [code, setCode] = useState('');
  const cookies = GraphQL_LC.COOKIE;
  const skipSolutions = 0;
  const numberSolutions = 10;
  const lang = 'python3';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = QUESTION_CONTENT_QUERY;

        const variables = {
          "titleSlug": problem
        };

        const response = await fetch(GraphQL_LC.URL.GRAPH_QL_URl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
          },
          body: JSON.stringify({ query, variables })
        });

        if (response.ok) {
          const data = await response.json();
          const fetchedProblem = data.data.question;
          setProblemData(fetchedProblem);
        } else {
          throw new Error('Failed to fetch problem data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSolutions = async () => {
      try {
        const query = COMMUNITY_SOLUTIONS_QUERY;

        const variables = {
          "questionSlug": problem,
          "skip": skipSolutions,
          "first": numberSolutions,
          "orderBy": "hot",
          "query": "",
          "languageTags": ["python3"],
          "topicTags": []
        };

        const response = await fetch(GraphQL_LC.URL.GRAPH_QL_URl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
          },
          body: JSON.stringify({ query, variables })
        });

        if (response.ok) {
          const data = await response.json();
          const fetchedSolutions = data.data.questionSolutions.solutions;
          setSolutionsList(fetchedSolutions);
        } else {
          throw new Error('Failed to fetch solutions');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchSolutions();
  }, [problem]);

  const fetchSolutionDetail = async (topicId) => {
    try {
      const query = COMMUNITY_SOLUTION_QUERY;
      const variables = { "topicId": topicId };
      const response = await fetch(GraphQL_LC.URL.GRAPH_QL_URl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
        },
        body: JSON.stringify({ query, variables })
      });
      if (response.ok) {
        const data = await response.json();
        const fetchedSolutionDetail = data.data.topic;
        setSolutionDetail(fetchedSolutionDetail);
      } else {
        throw new Error('Failed to fetch solution detail');
      }
    } catch (error) {
      console.error(error);
    }

  };

  const renderSolutionItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setSelectedSolution(item);
      fetchSolutionDetail(item.id);
      setShowDetail(false);
      setShowSolutions(false);
    }}>
      <View style={[styles.solutionItem, selectedSolution === item && styles.selectedSolution]}>
        <Text style={styles.solutionDetailTitle}>{item.title}</Text>
        <Text>Username: {item.post.author.username}</Text>
        <Text>ID: {item.id}</Text>
      </View>
    </TouchableOpacity>
  );

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const handleRunCode = async () => {
    try {
      const dataInput = "";
      const responsePromise = await executePythonCode(lang, code, dataInput);
      responsePromise.stdout = base64Decode(responsePromise.stdout);
      // console.log(responsePromise);
      setResponse(responsePromise);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question__title}</Text>
      <Text style={styles.title}>Difficulty: {"level " + difficulty} | submitted: {total_submitted}</Text>
      {problemData ? (
        <>
          <View style={styles.infoContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {
                setShowDetail(true);
                setShowSolutions(false);
                setShowIDE(false);
                setSolutionDetail(null);
              }}>
                <View>
                  <MaterialCommunityIcons name="file-document-outline" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setShowDetail(false);
                setShowSolutions(false);
                setShowIDE(true);
                setSolutionDetail(null);
              }}>
                <View>
                  <Ionicons name="terminal" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setShowDetail(false);
                setShowSolutions(true);
                setShowIDE(false);
                setSolutionDetail(null);
              }}>
                <View>
                  <AntDesign name="solution1" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {showDetail && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView && styles.solutionDetailContainer}>
              <View style={styles.viewContainer}>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: problemData.content
                  }}
                  ignoredDomTags={['font']}
                />
              </View>
            </ScrollView>

          )}

          {showIDE && (
            <>
              <ScrollView style={styles.scrollView && styles.IDEContainer1}>
                <TouchableOpacity style={{ flex: 1 }}>
                  <View style={styles.IDEContainer2}>
                    <IdeCode initialValue={code} onCodeChange={setCode} />
                  </View>
                </TouchableOpacity>

              </ScrollView>
              <TouchableOpacity onPress={() => {
                handleRunCode();
                handlePressOutside();
              }}>
                <View>
                  <Zocial name="googleplay" size={24} color="black" />
                </View>
              </TouchableOpacity>
              {getResponse && (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView && styles.solutionDetailContainer}>
                  <View>
                    <RenderHtml
                      contentWidth={width}
                      source={{
                        html: `
                        <pre style="font-family: 'Arial', sans-serif;">${getResponse.stdout ? getResponse.stdout.replace(/</g, "&lt;").replace(/\\n/g, '<br>') : ''}</pre>`
                      }}
                      ignoredDomTags={['font', 'int']}
                    />
                  </View>
                </ScrollView>
              )}

            </>

          )}

          {showSolutions && (
            <>
              {solutionsList && (
                <FlatList style={styles.scrollView && styles.solutionDetailContainer}
                  showsVerticalScrollIndicator={false}
                  data={solutionsList}
                  renderItem={renderSolutionItem}
                  keyExtractor={(item) => item.id.toString()}
                />
              )}
            </>
          )}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      {solutionDetail ? (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView && styles.solutionDetailContainer}>
          <View>
            <Text style={styles.solutionDetailTitle}>{solutionDetail.title}</Text>
            <RenderHtml
              contentWidth={width}
              source={{
                html: `
                <pre style="font-family: 'Arial', sans-serif;">${solutionDetail.post?.content
                    .replace(/</g, "&lt;")
                    .replace(/\\n/g, '<br>')
                  }</pre>`
              }}
              ignoredDomTags={['font', 'int']}
            />
          </View>
        </ScrollView>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F2FAFF',
  },
  viewContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#F6E8E8',
    padding: 6,
    borderRadius: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 10,
    paddingBottom: 20,
  },
  content: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 24,

  },
  solutionItem: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedSolution: {
    backgroundColor: '#e0e0e0',
  },
  solutionDetailContainer: {
    padding: 8,
    paddingTop: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 12,
    backgroundColor: 'white',
  },
  IDEContainer1: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
    maxHeight: 320,
    fontSize: 4,
  },
  IDEContainer2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 296,
    fontSize: 4,
  },
  solutionDetailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  solutionContent: {
    marginTop: 10,
    fontFamily: 'Courier New',
  },
  codeText: {
    fontSize: 8,
    fontFamily: 'Courier New',
    lineHeight: 24,
  },
  codeContainer: {
    padding: 16,
    height: 200,
    minWidth: "100%",
  },
  text: {
    fontSize: 8,
  },
});

export default ProblemDetailScreen;
