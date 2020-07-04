import React from 'react';
import { View, StyleSheet, SectionList, Text , Button} from 'react-native';

import { ListItem, Divider, SearchBar } from 'react-native-elements';

import { Rating, AirbnbRating } from 'react-native-elements';


const ORANGE = '#FF9500';
const BLUE = '#007AFF';
const GREEN = '#4CD964';
const RED = '#FF3B30';
const GREY = '#8E8E93';
const PURPLE = '#5856D6';
const TEAL_BLUE = '#5AC8FA';

const sections = [
  {
    data: [
      {
        title: <View style={{width: '100%',flexDirection: "row", justifyContent: 'space-between',}}><Text style={{fontWeight:"600", fontSize:30}}>볼링이란...</Text><Button title="X"/></View>,
        // rightTitle:'2020-20-20',
        subtitle:'잘 치면 들어간다.',
        icon: 'ios-airplane',
        backgroundColor: ORANGE,
      }
    ],
  },
  {
    data: [
      {
      title: <View style={{width: '100%',flexDirection: "row", justifyContent: 'space-between',}}><Text style={{fontWeight:"600", fontSize:30}}>역사</Text><Button title="X"/></View>,
        // rightTitle:'2020-20-20',
        subtitle:'1952년 7월에 용산구 미군기지에 수동 6레인 볼링장이 생기면서 대한민국에서 처음으로 볼링이 들어왔다.[9] 처음으로 일반인에게 공개된 볼링장은 1967년 10월에 개설된 워커힐 지하 호텔의 볼링장이었다. 이 시절 볼링은 상류층들의 전유물이었다.[5] 1969년 8월 16일 코리아볼링센터에 개설된 20레인 볼링장을 시작으로 점차 대중화되기 시작되었으며, 1971년에 개설된 센추럴 호텔의 볼링장을 시작으로 볼링 인구가 급격히 증가했다.[9] 1차 석유 파동으로 인해 볼링 사업이 잠시 주춤했지만 1974년에 한강 볼링장에 자동 핀 볼링장이 개설되면서 다시 성장하기 시작했다.',
        icon: 'ios-settings',
        backgroundColor: GREY,
        // rightIcon: <View><Button title="X"/><Button title="O"/><Button title="T"/></View>
      },
    ],
  },
  {
    data: [
      {
      title: <View style={{width: '100%',flexDirection: "row", justifyContent: 'space-between',}}><Text style={{fontWeight:"600", fontSize:30}}>역사</Text><Button title="X"/></View>,
        // rightTitle:'2020-20-20',
        subtitle:'1952년 7월에 용산구 미군기지에 수동 6레인 볼링장이 생기면서 대한민국에서 처음으로 볼링이 들어왔다.[9] 처음으로 일반인에게 공개된 볼링장은 1967년 10월에 개설된 워커힐 지하 호텔의 볼링장이었다. 이 시절 볼링은 상류층들의 전유물이었다.[5] 1969년 8월 16일 코리아볼링센터에 개설된 20레인 볼링장을 시작으로 점차 대중화되기 시작되었으며, 1971년에 개설된 센추럴 호텔의 볼링장을 시작으로 볼링 인구가 급격히 증가했다.[9] 1차 석유 파동으로 인해 볼링 사업이 잠시 주춤했지만 1974년에 한강 볼링장에 자동 핀 볼링장이 개설되면서 다시 성장하기 시작했다.',
        icon: 'ios-settings',
        backgroundColor: GREY,
        // rightIcon: <View><Button title="X"/><Button title="O"/><Button title="T"/></View>
      },
    ],
  },
  {
    data: [
      {
      title: <View style={{width: '100%',flexDirection: "row", justifyContent: 'space-between',}}><Text style={{fontWeight:"600", fontSize:30}}>역사</Text><Button title="X"/></View>,
        // rightTitle:'2020-20-20',
        subtitle:'1952년 7월에 용산구 미군기지에 수동 6레인 볼링장이 생기면서 대한민국에서 처음으로 볼링이 들어왔다.[9] 처음으로 일반인에게 공개된 볼링장은 1967년 10월에 개설된 워커힐 지하 호텔의 볼링장이었다. 이 시절 볼링은 상류층들의 전유물이었다.[5] 1969년 8월 16일 코리아볼링센터에 개설된 20레인 볼링장을 시작으로 점차 대중화되기 시작되었으며, 1971년에 개설된 센추럴 호텔의 볼링장을 시작으로 볼링 인구가 급격히 증가했다.[9] 1차 석유 파동으로 인해 볼링 사업이 잠시 주춤했지만 1974년에 한강 볼링장에 자동 핀 볼링장이 개설되면서 다시 성장하기 시작했다.',
        icon: 'ios-settings',
        backgroundColor: GREY,
        // rightIcon: <View><Button title="X"/><Button title="O"/><Button title="T"/></View>
      },
    ],
  },
  // Space at the bottom
  { data: [] },
];

export default class Memos extends React.PureComponent {
  renderItem = ({
    item: { title, subtitle, backgroundColor, icon, rightTitle,rightIcon, rightSubtitle, hideChevron, checkbox },
  }) => (
    <ListItem
      containerStyle={{ paddingVertical: 8 }}
      switch={checkbox && { value: true }}
      key={title}
      subtitle={subtitle}
      // chevron={!hideChevron}
      rightTitle={rightTitle}
      rightSubtitle={rightSubtitle}
      rightIcon={rightIcon}
      // leftIcon={{
      //   type: 'ionicon',
      //   name: icon,
      //   size: 20,
      //   color: 'white',
      //   containerStyle: {
      //     backgroundColor,
      //     width: 28,
      //     height: 28,
      //     borderRadius: 6,
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //   },
      // }}
      title={title}
      // titleStyle={{fontWeight:"600", fontSize:30}}
       
    />
  );

  renderSectionHeader = () => <View style={styles.headerSection} />;

  ItemSeparatorComponent = () => (
    <View style={styles.separatorComponent}>
      <Divider style={styles.separator} />
    </View>
  );

  ListHeaderComponent = () => (
    <View>
      <SearchBar platform="ios" placeholder="Search" />
      <Divider />
    </View>
  );

  keyExtractor = (item, index) => index;

  render() {
    return (
      <>
        
        <SectionList
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.ListHeaderComponent}
          contentContainerStyle={styles.containerStyle}
          sections={sections}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          SectionSeparatorComponent={Divider}
          stickySectionHeadersEnabled={false}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFF4',
  },
  separatorComponent: {
    backgroundColor: 'white',
  },
  separator: {
    marginLeft: 58,
  },
  headerSection: {
    height: 30,
  },
});