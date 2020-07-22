/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, StyleSheet, Alert, Modal } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { KAKAO_APP_KEY } from '../../key/ApiKey';
// const KAKAO_APP_KEY = KAKAO_APP_KEY;

const { width, height } = Dimensions.get('window');

export default function MapSearch(props) {
  const { modalVisible, setModalVisible, savePlaceInfo } = props;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [search, setSearch] = useState('');
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const newLocation = {
        x: currentLocation.coords.longitude,
        y: currentLocation.coords.latitude,
      };
      setLocation(newLocation);
    })();
  }, []);

  const searchPlace = (text) => {
    axios({
      url: 'https://dapi.kakao.com/v2/local/search/keyword.json?sort=distance',
      method: 'get',
      headers: {
        Authorization: `KakaoAK ${KAKAO_APP_KEY}`,
      },
      params: {
        query: text,
        x: location.x,
        y: location.y,
      },
      timeout: 500,
    }).then((res) => {
      const dataArray = res.data.documents;
      setSearchArray(dataArray);
    });
  };
  // console.log(searchArray);
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
            <View style={styles.actions}>
              <Text> </Text>
              <Text style={styles.modalText}>볼링장 검색</Text>
              <FontAwesome
                name="close"
                size={24}
                color="black"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
            <SearchBar
              platform="ios"
              placeholder="Search"
              onChangeText={(text) => {
                searchPlace(text);
                setSearch(text);
              }}
              value={search}
            />
            <ScrollView style={{ height: height / 2, width: '98%' }}>
              {/* // foreach -> map 으로 바꾸니 나오는듯. */}
              {searchArray.map((data) => {
                return (
                  <SearchList
                    key={data.id}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...data}
                    savePlaceInfo={savePlaceInfo}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function SearchList(props) {
  const {
    id,
    distance,
    road_address_name,
    place_name,
    savePlaceInfo,
    modalVisible,
    setModalVisible,
  } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        const info = {
          id,
          name: place_name,
        };
        savePlaceInfo(info);
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
        <MaterialIcons name="place" size={35} color="black" />
        <View>
          <Text style={styles.resultText}>{road_address_name}</Text>
          <Text style={styles.resultText}>
            {place_name} {distance / 1000} km
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

SearchList.propTypes = {
  id: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  road_address_name: PropTypes.string.isRequired,
  place_name: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  savePlaceInfo: PropTypes.func.isRequired,
};

MapSearch.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  savePlaceInfo: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    // width: '98%',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginVertical: 4,
  },

  resultText: {
    fontSize: 18,
  },

  centeredView: {
    // flex: 1,
    height: '70%',
    // width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '94%',
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

  modalView: {
    width: '93%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 1,
    // marginRight: 100,
    // marginLeft: 100,
    // paddingRight: 50,
    // paddingLeft: 50,
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
