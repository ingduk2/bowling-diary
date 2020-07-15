/* eslint-disable no-use-before-define */
import React from 'react';
import { View, StyleSheet, SectionList } from 'react-native';

import { ListItem, Divider } from 'react-native-elements';
import * as RootNavigation from '../../navi/RootNavigation';

const ORANGE = '#FF9500';
const BLUE = '#007AFF';
const GREEN = '#4CD964';
const RED = '#FF3B30';
// const GREY = '#8E8E93';
// const PURPLE = '#5856D6';
// const TEAL_BLUE = '#5AC8FA';
const YELLOW = '#FAFF00';
const sections = [
  {
    data: [
      {
        title: '로그인',
        // backgroundColor: RED,
        iconType: 'AntDesign',
        icon: 'user',
        // eslint-disable-next-line no-use-before-define
        func: settingNavigate,
        screenName: 'Login',
      },
      {
        title: '홈 설정',
        // backgroundColor: ORANGE,
        iconType: 'AntDesign',
        icon: 'home',
        // eslint-disable-next-line no-use-before-define
        func: settingNavigate,
        screenName: 'HomeSettings',
      },
      {
        title: '통계 설정',
        // backgroundColor: YELLOW,
        iconType: 'AntDesign',
        icon: 'bar-chart-o',
        // rightTitle: 'Off',
        // eslint-disable-next-line no-use-before-define
        func: settingNavigate,
        screenName: 'StatsSettings',
      },
      {
        title: '메모장 설정',
        // backgroundColor: GREEN,
        iconType: 'AntDesign',
        icon: 'sticky-note-o',
        // eslint-disable-next-line no-use-before-define
        func: settingNavigate,
        screenName: 'MemoSettings',
      },
      {
        title: '앱 정보',
        // backgroundColor: BLUE,
        iconType: 'AntDesign',
        icon: 'info',
        // rightTitle: 'Off',
        // eslint-disable-next-line no-use-before-define
        func: settingNavigate,
        screenName: 'AppInfo',
      },
    ],
  },
];

// Arrow 로는 불가능한가....
function settingNavigate(name) {
  RootNavigation.navigate(name, {});
}

export default class Settings extends React.PureComponent {
  renderItem = ({
    item: {
      title,
      backgroundColor,
      iconType,
      icon,
      rightTitle,
      hideChevron,
      checkbox,
      func,
      screenName,
    },
  }) => (
    <ListItem
      containerStyle={{
        paddingVertical: 13,
      }}
      switch={
        checkbox && {
          value: true,
        }
      }
      key={title}
      chevron={!hideChevron}
      rightTitle={rightTitle}
      onPress={() => func(screenName)}
      leftIcon={{
        type: 'font-awesome',
        name: icon,
        size: 20,
        // color: 'white',
        containerStyle: {
          backgroundColor: '',
          width: 29,
          height: 29,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      title={title}
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
      <Divider style={styles.separator} />
    </View>
  );

  keyExtractor = (item, index) => index;

  render() {
    return (
      <>
        <SectionList
          keyExtractor={this.keyExtractor}
          // ListHeaderComponent={this.ListHeaderComponent}
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
    height: 1,
  },
});
