import React from 'react';
import { View, StyleSheet, SectionList , Alert} from 'react-native';

import { ListItem, Divider, SearchBar } from 'react-native-elements';
import * as RootNavigation from '../navi/RootNavigation';


const ORANGE = '#FF9500';
const BLUE = '#007AFF';
const GREEN = '#4CD964';
const RED = '#FF3B30';
const GREY = '#8E8E93';
const PURPLE = '#5856D6';
const TEAL_BLUE = '#5AC8FA';
const YELLOW = '#FAFF00';
const sections = [
  {
    data: [

      {
        title: 'Home Setting',
        backgroundColor: RED,
        icon: 'forward',
        func : OpenSourceInfo
      },
      {
        title: 'Stats Setting',
        backgroundColor: ORANGE,
        icon: 'forward',
        // rightTitle: 'Off',
        func : OpenSourceInfo
      },
      {
        title: 'Memos Setting',
        backgroundColor: YELLOW,
        icon: 'forward',
        func : OpenSourceInfo
      },
      {
        title: 'OpenSourceInfo',
        backgroundColor: GREEN,
        icon: 'forward',
        // rightTitle: 'Off',
        func : OpenSourceInfo
      },
    ],
  },
//   {
//     data: [
//       {
//         title: 'Notifications',
//         icon: 'ios-notifications',
//         backgroundColor: RED,
//       },
//       {
//         title: 'Control Center',
//         backgroundColor: GREY,
//         icon: 'ios-switch',
//       },
//       {
//         title: 'Do Not Disturb',
//         backgroundColor: PURPLE,
//         icon: 'ios-moon',
//       },
//     ],
//   },
//   {
//     data: [
//       {
//         title: 'General',
//         icon: 'ios-settings',
//         backgroundColor: GREY,
//       },
//       {
//         title: 'Display & Brightness',
//         backgroundColor: BLUE,
//         icon: 'ios-bulb',
//       },
//       {
//         title: 'Wallpaper',
//         backgroundColor: TEAL_BLUE,
//         icon: 'ios-color-wand',
//       },
//       {
//         title: 'Sounds',
//         backgroundColor: RED,
//         icon: 'ios-volume-high',
//       },
//       {
//         title: 'Touch ID & Code',
//         backgroundColor: RED,
//         icon: 'ios-finger-print',
//       },
//       {
//         title: 'Emergency Call',
//         backgroundColor: ORANGE,
//         icon: 'ios-medical',
//       },
//       {
//         title: 'Battery',
//         backgroundColor: GREEN,
//         icon: 'ios-battery-full',
//       },
//       {
//         title: 'Confidentiality',
//         backgroundColor: GREY,
//         icon: 'ios-hand',
//       },
    // ],
//   },
  // Space at the bottom
//   { data: [] },
];

//Arrow 로는 불가능한가....
function OpenSourceInfo(){
   RootNavigation.navigate('OpenSourceInfo', {});
}

export default class Settings extends React.PureComponent {
  renderItem = ({
    item: { title, backgroundColor, icon, rightTitle, hideChevron, checkbox , func},
  }) => (
    <ListItem
      containerStyle={{ paddingVertical: 8 }}
      switch={checkbox && { value: true }}
      key={title}
      chevron={!hideChevron}
      rightTitle={rightTitle}
      onPress ={() => func()}
      leftIcon={{
        type: 'AntDesign',
        name: icon,
        size: 30,
        color: 'white',
        containerStyle: {
          backgroundColor,
          width: 40,
          height: 40,
          borderRadius: 6,
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
    height: 1,
  },
});