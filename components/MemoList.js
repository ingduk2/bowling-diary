/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Entypo, Feather } from '@expo/vector-icons';
import MemoThemecontext from '../context/MemoThemeContext';
import { numberAppendZero } from '../constants/const';

const { width, height } = Dimensions.get('window');

export default function MemoList(props) {
  // const [modalVisible, setModalVisible] = useState(false);

  const {
    id,
    title,
    content,
    createdAt,
    deleteMemo,
    setTitle,
    setContent,
    modalVisible,
    setModalVisible,
    setModalState,
    setId,
  } = props;

  let createDate = null;
  if (Platform.OS === 'ios') {
    createDate = new Date(createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  } else {
    const nowDay = new Date(createdAt);
    const year = nowDay.getFullYear().toString();
    const month = (nowDay.getMonth() + 1).toString();
    const day = nowDay.getDate().toString();
    let hour = nowDay.getHours();
    const minute = numberAppendZero(nowDay.getMinutes());
    const second = numberAppendZero(nowDay.getSeconds());
    let isAM = false;
    if (hour > 12) {
      isAM = false;
      hour -= 12;
    } else {
      isAM = true;
    }

    const nowDate = `${year}.${month.length === 1 ? '0' : ''}${month}.${
      day.length === 1 ? '0' : ''
    }${day}. ${isAM ? '오전' : '오후'} ${hour}:${minute}:${second}`;

    createDate = nowDate;
  }
  console.log(createDate);
  const { theme } = useContext(MemoThemecontext);
  return (
    <View style={[styles.container, theme === 'bright' ? styles.themeBright : styles.themeDark]}>
      <View>
        <View style={styles.column}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => {
                setId(id);
                setTitle(title);
                setContent(content);
                setModalState('update');
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.actionContainer}>
                {/* <Text style={styles.actionText}>✏️</Text> */}
                <Entypo name="pencil" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                deleteMemo(id);
              }}
            >
              <View style={styles.actionContainer}>
                {/* <Text style={styles.actionText}>❌</Text> */}
                <Feather name="trash-2" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.date}>{createDate}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
}

MemoList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  setTitle: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  deleteMemo: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  dot: {
    marginRight: 20,
  },
  container: {
    width,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  uncompletedCircle: {
    borderColor: '#F23657',
  },
  text: {
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 15,
    width: width / 2 + 40,
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  uncompletedText: {
    color: '#353839',
  },
  column: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    width,
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 30,
    marginVertical: 10,
    // width: width / 2 + 40,
  },
  date: {
    fontWeight: '300',
    fontSize: 15,
  },
  content: {
    fontWeight: '100',
    fontSize: 16,
    marginVertical: 15,
  },

  modalTitle: {
    width: width / 1.5,
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
    width: width / 1.5,
    height: height / 10,
    borderColor: 'black',
    padding: 2,
    margin: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 10,
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
  themeBright: {
    backgroundColor: 'white',
  },
  themeDark: {
    backgroundColor: 'grey',
  },
});
