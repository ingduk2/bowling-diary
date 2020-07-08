import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import PropTypes from 'prop-types';
import Stats from '../components/Stats';
import { loadScoreDatas } from './ScoreLoad';

const StatsStack = createStackNavigator();

// eslint-disable-next-line react/prop-types
function StatsScreen({ navigation }) {
  console.log('StatsScreen StatsScreen StatsScreen StatsScreen');

  const [datas, setData] = useState({});

  const loadScoreDatass = async () => {
    const loadDatas = await loadScoreDatas();
    setData(loadDatas);
  };

  React.useEffect(
    () =>
      // eslint-disable-next-line react/prop-types
      navigation.addListener('focus', () => {
        console.log('Screen was ffffffffffffocused');
        loadScoreDatass();
      }),
    []
  );

  React.useEffect(
    // eslint-disable-next-line react/prop-types
    () => navigation.addListener('blur', () => console.log('Screen was unfocused')),
    []
  );

  return (
    <View style={{ flex: 1, padding: 3, backgroundColor: '#fff' }}>
      <ScrollView>
        <Stats datas={datas} />
      </ScrollView>
    </View>
  );
}

export default function StatsStackScreen() {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen name="Stats" component={StatsScreen} />
    </StatsStack.Navigator>
  );
}
