import React from 'react';
import { View, StyleSheet, SectionList, Text, Button } from 'react-native';

import { ListItem, Divider, SearchBar } from 'react-native-elements';

import { Rating, AirbnbRating } from 'react-native-elements';


const ORANGE = '#FF9500';
const BLUE = '#007AFF';
const GREEN = '#4CD964';
const RED = '#FF3B30';
const GREY = '#8E8E93';
const PURPLE = '#5856D6';
const TEAL_BLUE = '#5AC8FA';


export default class Memos extends React.PureComponent {
  
  
  renderItem = ({
    item: { title, subtitle, backgroundColor, icon, rightTitle, rightIcon, rightSubtitle, hideChevron, checkbox },
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
  state = {
    searchValue:""
  }

  updateSearch = (searchValue) => {
    this.setState({searchValue});
  }
  
  ListHeaderComponent = () => (
    <View>
    {/* //   <SearchBar platform="ios" value={this.state.searchValue} placeholder="Search" onChangeText={this.updateSearch} /> */}
    {/* //   <Divider /> */}
    </View>
  );

  keyExtractor = (item, index) => index;

  render() {
    const sections = this.props.memos;
    const {searchValue} = this.state;
    return (
      <>

    <View>
      <SearchBar platform="ios" value={searchValue} placeholder="Search" onChangeText={this.updateSearch} />
      <Divider />
    </View>

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