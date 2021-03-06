/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet,
  AsyncStorage,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider, SearchBar } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
import { v1 as uuidv1 } from 'uuid';
import MemoList from '../components/MemoList';
import { seed } from '../uuid/uuidSeed';
import MemoModal from '../components/modal/MemoModal';

const { width, height } = Dimensions.get('window');
const MsmosStack = createStackNavigator();

export default function MemosStackScreen() {
  return (
    <MsmosStack.Navigator>
      <MsmosStack.Screen name="Memos" component={MemosScreen} />
    </MsmosStack.Navigator>
  );
}

async function loadMemoDatas() {
  let memoDatas = {};
  try {
    const datas = await AsyncStorage.getItem('memoDatas');
    // console.log("datas", datas);
    const parsedToDos = JSON.parse(datas);
    console.log('parsedToDos', parsedToDos);
    if (parsedToDos == null) {
      memoDatas = {};
    } else {
      memoDatas = parsedToDos;
    }
  } catch (err) {
    console.log(err);
  }
  return memoDatas;
}

function MemosScreen() {
  const [memos, setMemos] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modalState, setModalState] = useState('');
  const [_id, setId] = useState('');
  console.log('MemosScreen', modalVisible);

  useEffect(() => {
    const fetchData = async () => {
      const diskMemoDatas = await loadMemoDatas();
      // console.log(articleData);
      setMemos(diskMemoDatas);
    };

    fetchData();
  }, []);

  const addMemo = (memo) => {
    const { newTitle, newContent } = memo;
    const ID = uuidv1({ random: seed() });
    const newMemo = {
      [ID]: {
        id: ID,
        title: newTitle,
        content: newContent,
        createdAt: Date.now(),
      },
    };
    console.log(newMemo);
    const newMemos = {
      ...memos,
      ...newMemo,
    };
    saveMemosData(newMemos);
    setMemos(newMemos);
  };

  const deleteMemo = (id) => {
    delete memos[id];
    const newMemos = {
      ...memos,
    };
    saveMemosData(newMemos);
    setMemos(newMemos);
  };

  const updateMemo = (memo) => {
    const { id, newTitle, newContent } = memo;
    const newMemos = {
      ...memos,
      [id]: { ...memos[id], title: newTitle, content: newContent },
    };
    saveMemosData(newMemos);
    setMemos(newMemos);
  };

  const saveMemosData = (newMemos) => {
    // console.log(newMemos);
    AsyncStorage.setItem('memoDatas', JSON.stringify(newMemos));
  };

  return (
    <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>
      <MemoModal
        id={_id}
        modalState={modalState}
        title={title}
        content={content}
        addMemo={addMemo}
        updateMemo={updateMemo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View>
        <SearchBar
          platform="ios"
          value={searchValue}
          placeholder="Search"
          onChangeText={setSearchValue}
        />
        <Divider />
      </View>
      <ScrollView>
        {Object.values(memos)
          .sort((a, b) => {
            return b.createdAt - a.createdAt;
          })
          .map((memo) => {
            if (
              searchValue === '' ||
              memo.title.includes(searchValue) ||
              memo.content.includes(searchValue)
            ) {
              return (
                <MemoList
                  key={memo.id}
                  setId={setId}
                  deleteMemo={deleteMemo}
                  updateMemo={updateMemo}
                  setContent={setContent}
                  setTitle={setTitle}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  setModalState={setModalState}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...memo}
                />
              );
            }

            return null;
          })}
      </ScrollView>
      {/* <View style={styles.container}> */}

      <FloatingAction
        // ref={(ref) => { this.floatingAction = ref; }}
        // actions={actions}
        showBackground={false}
        // overrideWithAction={false}
        animated={false}
        onPressMain={() => {
          console.log('onPress');
          setTitle('');
          setContent('');
          setModalState('add');
          setModalVisible(!modalVisible);
        }}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          setModalVisible(!modalVisible);
        }}
      />
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000',
  },

  actions: {
    flexDirection: 'row',
  },
  modalTitle: {
    width: width / 2,
    borderColor: 'black',
    padding: 2,
    margin: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
    // alignItems : 'center',
    textAlign: 'center',
    // justifyContent: 'center'
  },
  modalContent: {
    width: width / 2,
    height: height / 10,
    borderColor: 'black',
    padding: 2,
    margin: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
    // alignItems : 'center',
    textAlign: 'center',
    // justifyContent: 'center'
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
});
