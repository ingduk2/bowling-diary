/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export default function MemoModal(props) {
  const {
    id,
    modalState,
    title,
    content,
    addMemo,
    updateMemo,
    modalVisible,
    setModalVisible,
  } = props;

  //   const [newModalVisible, setNewModalVisible] = useState(modalVisible);
  //   console.log(MemoModal, modalVisible, newModalVisible);
  console.log(MemoModal, title, content, modalState);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  useEffect(() => {
    console.log('title');
    setNewTitle(props.title);
  }, [props]);

  useEffect(() => {
    console.log('content');
    setNewContent(props.content);
  }, [props]);

  //   const [title, setTitle] = useState(title);
  //   const [content, setContent] = useState(title);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>메모 입력</Text>
            <TextInput
              style={styles.modalTitle}
              placeholder="제목"
              value={newTitle}
              editable
              underlineColorAndroid="transparent"
              // keyboardType='numeric'
              // maxLength={3}
              // returnKeyType={"done"}
              multiline
              autoCorrect={false}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.modalContent}
              value={newContent}
              placeholder="내용"
              editable
              underlineColorAndroid="transparent"
              // keyboardType='numeric'
              // maxLength={3}
              // returnKeyType={"done"}
              multiline
              autoCorrect={false}
              onChangeText={setNewContent}
            />
            <View style={styles.actions}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>cancle</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#219FFF',
                  marginLeft: 20,
                  width: 60,
                }}
                onPress={() => {
                  if (modalState === 'add') {
                    const newMemo = {
                      newTitle,
                      newContent,
                    };
                    addMemo(newMemo);
                  } else if (modalState === 'update') {
                    const newMemo = {
                      id,
                      newTitle,
                      newContent,
                    };
                    updateMemo(newMemo);
                  }
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>ok</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

MemoModal.propTypes = {
  id: PropTypes.string.isRequired,
  modalState: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  addMemo: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  updateMemo: PropTypes.func.isRequired,
};

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
