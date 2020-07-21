/* eslint-disable no-use-before-define */
/* eslint-disable global-require */
import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  ScrollView,
  AsyncStorage,
  Alert,
  Dimensions,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FloatingAction } from 'react-native-floating-action';
import { Feather, AntDesign } from '@expo/vector-icons';
import { v1 as uuidv1 } from 'uuid';
import ScoreInput from '../components/ScoreInput';
import WixCalendar from '../components/WixCalendar';
import { seed } from '../uuid/uuidSeed';
import ScoreList from '../components/ScoreList';
import { loadScoreDatas, useScoreData } from './ScoreLoad';
import ScoreModal from '../components/modal/ScoreModal';
import HomeThemeContext from '../context/HomeThemeContext';
import Map from '../components/map/MapSearch';

const { width, height } = Dimensions.get('window');
const HomeStack = createStackNavigator();

function LogoTitle() {
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <Image
        style={{
          width: 110,
          height: 40,
        }}
        source={require('../assets/gorilla.png')}
      />
    </View>
  );
}

export default function HomeStackScreen() {
  useEffect(() => {
    console.log('HomeStackScreen useEfect');
  }, []);

  const createTwoButtonAlert = () =>
    Alert.alert(
      '인스타그램 이동',
      'OK를 누르시면 고릴라볼링샵 인스타그램으로 이동합니다.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // console.log('OK Pressed');
            const appUrl = 'instagram://user?username=gorilla_bowling_shop';
            const webUrl = 'https://www.instagram.com/gorilla_bowling_shop';
            Linking.canOpenURL(appUrl)
              .then((supported) => {
                Linking.openURL(supported ? appUrl : webUrl);
              })
              .catch((err) => Alert.alert(err));
          },
        },
      ],
      { cancelable: false },
    );

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // eslint-disable-next-line react/jsx-props-no-spreading
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleStyles: {
            paddingLeft: 20,
          },
          headerRight: () => (
            <AntDesign
              name="instagram"
              size={33}
              onPre
              onPress={() => createTwoButtonAlert()}
              style={{
                paddingRight: 20,
              }}
            />
          ),
          headerLeft: () => (
            <Feather
              name="phone-forwarded"
              size={33}
              onPress={() => Linking.openURL('tel:01040400537')}
              style={{
                paddingLeft: 20,
              }}
            />
          ),
        }}
      />
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </HomeStack.Navigator>
  );
}

function HomeScreen() {
  const nowDay = new Date();
  const year = nowDay.getFullYear().toString();
  const month = (nowDay.getMonth() + 1).toString();
  const day = nowDay.getDate().toString();

  const nowDate = `${year}-${month.length === 1 ? '0' : ''}${month}-${
    day.length === 1 ? '0' : ''
  }${day}`;

  const [datas, setData] = useState({});
  // const [datas, setData] = useScoreData();
  const [_score, setScore] = useState('');
  const [_date, setDate] = useState(nowDate);
  console.log('HomeScreen', _date);
  const [_place, setPlace] = useState('');
  const [_condition, setCondition] = useState(5);
  const { homeThemes } = useContext(HomeThemeContext);
  const [calandarEnable, setCalandarEnable] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState('add');
  const [_id, setId] = useState('');
  useEffect(() => {
    console.log('ScoreLoads.useEffect');
    const fetchData = async () => {
      const loadDatas = await loadScoreDatas();
      // console.log(loadDatas);
      setData(loadDatas);
    };
    fetchData();
  }, []);

  const Save = () => {
    const ID = uuidv1({
      random: seed(),
    });
    console.log('Save', _score, _date, ID);
    const newDataObject = {
      [ID]: {
        id: ID,
        score: _score,
        date: _date,
        place: _place,
        condition: _condition,
        createdAt: Date.now(),
      },
    };

    // console.log(newDataObject);
    return newDataObject;
  };

  const saveScore = (score) => {
    setScore(score);
  };

  const savePlace = (place) => {
    setPlace(place);
  };

  const saveCondition = (condition) => {
    setCondition(condition);
  };

  const saveDate = (date) => {
    setDate(date);
    console.log(date);
  };

  const addScoreData = () => {
    // score
    console.log('_addScoreData', _score, _date, _place, _condition);
    if (_score == null || _score === '' || _date == null) {
      Alert.alert('점수나 날짜를 확인해주세요');
      return;
    }

    const newData = Save();
    const newDatas = {
      ...datas,
      ...newData,
    };

    setScore('');
    // set_Date("")
    saveScoreData(newDatas);
    setData(newDatas);
  };

  const deleteScoreData = (id) => {
    // id 로 data 지우고 setData 하면 될듯함.
    delete datas[id];
    const newDatas = {
      ...datas,
    };
    saveScoreData(newDatas);
    setData(newDatas);
  };

  const updateScoreData = (id, score, place, condition) => {
    const newDatas = {
      ...datas,

      [id]: {
        ...datas[id],
        score,
        place,
        condition,
      },
    };
    saveScoreData(newDatas);
    setData(newDatas);
  };

  const saveScoreData = (newdatas) => {
    AsyncStorage.setItem('scoreDatas', JSON.stringify(newdatas));
  };

  return (
    <View
      style={{
        flex: 1,
        // padding: 1,
        backgroundColor: '#fff',
      }}
    >
      <ScoreModal
        id={_id}
        score={_score}
        place={_place}
        condition={_condition}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setScore={setScore}
        setPlace={setPlace}
        setCondition={setCondition}
        addScoreData={addScoreData}
        updateScoreData={updateScoreData}
        modalState={modalState}
      />
      <View style={{ backgroundColor: 'white' }}>
        {calandarEnable === true && (
          <ScrollView>
            <WixCalendar style={{ height }} saveDate={saveDate} datas={datas} nowDate={_date} />
          </ScrollView>
        )}

        <ScoreInput
          saveScore={saveScore}
          addScoreData={addScoreData}
          savePlace={savePlace}
          saveCondition={saveCondition}
          calandarEnable={calandarEnable}
        />
      </View>
      <Text
        style={{
          alignSelf: 'flex-start',
          paddingLeft: 10,
          paddingVertical: 10,
          fontWeight: '700',
          fontSize: 20,
        }}
      >
        {_date}
      </Text>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
          {Object.values(datas == null ? {} : datas)
            .sort(
              (a, b) =>
                // a.date - b.date
                // new Date(b.date).getTime() - new Date(a.date).getTime(),
                b.createdAt - a.createdAt,
            )
            .map((data) => {
              if (data.date === _date) {
                return (
                  <ScoreList
                    key={data.id}
                    setScore={setScore}
                    setPlace={setPlace}
                    setId={setId}
                    setCondition={setCondition}
                    deleteScoreData={deleteScoreData}
                    updateScoreData={updateScoreData}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    setModalState={setModalState}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...data}
                  />
                );
              }
              return null;
            })}
        </ScrollView>
      </View>

      <FloatingAction
        // ref={(ref) => { this.floatingAction = ref; }}
        // actions={actions}
        showBackground={false}
        // overrideWithAction={false}
        animated={false}
        onPressMain={() => {
          setScore('');
          setPlace('');
          setCondition(5);
          setModalState('add');
          console.log('onPress');
          // if (homeThemes !== undefined) {
          if (!homeThemes.popupInput.enable) {
            setCalandarEnable(!calandarEnable);
          } else {
            setModalVisible(!modalVisible);
          }
          // }
        }}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          // setModalVisible(!modalVisible);
        }}
      />
    </View>
  );
}
