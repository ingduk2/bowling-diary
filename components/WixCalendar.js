import React, { Component } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import PropTypes from 'prop-types';
const { width, height } = Dimensions.get('window');

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

export default class WixCalendar extends Component {
  constructor(props) {
    super(props);
    console.log('WixCalendar constructor', props.nowDate);

    const { nowDate } = props;
    console.log(nowDate);
    this.state = {
      selected: nowDate,
    };
  }

  componentDidMount = () => {
    console.log('WixCalendar componentDidMount');
  };

  render() {
    console.log('WixCalendar render');

    const { selected } = this.state;
    const { saveDate, datas } = this.props;
    // this.setState({
    //   selected: nowDate,
    // });
    const clicked = {
      selected: 'true',
      disableTouchEvent: true,
      selectedColor: '#00B7F4',
      selectedTextColor: 'white',
    };
    const clickedDate = {};
    clickedDate[selected] = {
      ...clicked,
    };

    let markedObject = {
      ...clickedDate,
    };
    // console.log("-=================" , clickedDate);

    let saveDates = {};
    Object.values(datas).map((data) => {
      const eachDate = {};
      const dots = {
        dots: [{ key: 'game', color: 'red', selectedDotColor: 'red' }],
      };
      if (selected === data.date) {
        // console.log('same date!!!!!!!!!!!!');
        // 합쳐야함.
        eachDate[data.date] = {
          ...clicked,
          ...dots,
        };
      } else {
        // 그냥 dot 찍는다.
        eachDate[data.date] = {
          ...dots,
        };
      }

      saveDates = {
        ...saveDates,
        ...eachDate,
      };
      return null;
    });
    // console.log("==========================");
    // console.log(saveDates);
    // console.log("==========================");

    markedObject = {
      ...markedObject,
      ...saveDates,
    };

    // console.log("============", markedObject);

    return (
      <View style={{ paddingTop: 1 }}>
        <Calendar
          style={{
            // padding: 0,
            // borderWidth: 1,
            borderColor: 'gray',
            // backgroundColor: 'grey',
            // height: 340,
          }}
          theme={{
            'stylesheet.calendar.header': {
              header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                // marginTop: 1,
                alignItems: 'center',
              },
              week: {
                // marginTop: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
              },
            },
            // textDayFontSize: 16,
            // textMonthFontSize: 16,
            // textDayHeaderFontSize: 16,
            'stylesheet.day.basic': {
              text: {
                marginTop: Platform.OS === 'android' ? 1 : 1,
              },
            },
          }}
          // dayComponent={({date, state}) => {
          //     return (
          //       <View>
          //         <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
          //           {date.day}
          //         </Text>
          //         <Text style={{color:'red'}}>1</Text>
          //       </View>
          //     );
          //   }}
          // // // Initially visible month. Default = Date()
          // current={'2020-06-07'}
          // // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={'2020-01-01'}
          // // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={'2020-12-31'}
          // // // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            this.setState({
              selected: day.dateString,
            });
            saveDate(day.dateString);
            console.log('selected day', day.dateString);
            console.log('selected day', day);
          }}
          // // // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          // // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat="yyyy MM"
          // // // Handler which gets executed when visible month changes in calendar. Default = undefined
          // onMonthChange={(month) => {console.log('month changed', month)}}
          // // // Hide month navigation arrows. Default = false
          // // hideArrows={true}
          // // // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // // renderArrow={(direction) => (<Arrow/>)}
          // // // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // // // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // // // day from another month that is visible in calendar page. Default = false
          // // disableMonthChange={true}
          // // // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          // // firstDay={1}
          // // // Hide day names. Default = false
          // // hideDayNames={false}
          // // // Show week numbers to the left. Default = false
          // // showWeekNumbers={false}
          // // // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          // // onPressArrowLeft={substractMonth => substractMonth()}
          // // // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          // // onPressArrowRight={addMonth => addMonth()}
          // // // Disable left arrow. Default = false
          // // disableArrowLeft={false}
          // // // Disable right arrow. Default = false
          // // disableArrowRight={false}
          // // // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          // // disableAllTouchEventsForDisabledDays={true}
          // // /** Replace default month and year title with custom one. the function receive a date as parameter. */
          // // //renderHeader={(date) => {/*Return JSX*/}}
          markingType="multi-dot"
          // markedDates={{
          //     // [selected]: {'selected': 'true', 'disableTouchEvent': true, 'selectedColor': 'black', 'selectedTextColor': 'white'} ,

          //     "2020-06-01":{"dots":[{"key":"vacation","color":"green","selectedDotColor":"red"},{"key":"massage","color":"red","selectedDotColor":"green"},{"key":"a","color":"red","selectedDotColor":"green"},{"key":"b","color":"red","selectedDotColor":"green"},{"key":"c","color":"red","selectedDotColor":"green"},{"key":"d","color":"red","selectedDotColor":"green"},{"key":"e","color":"red","selectedDotColor":"green"},{"key":"f","color":"red","selectedDotColor":"green"},{"key":"g","color":"red","selectedDotColor":"green"},{"key":"h","color":"red","selectedDotColor":"green"},{"key":"i","color":"red","selectedDotColor":"green"},{"key":"j","color":"red","selectedDotColor":"green"}]},
          //     paramStr

          //   }}

          pastScrollRange={10}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={10}
          // Enable or disable scrolling of calendar list
          scrollEnabled
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator
          markedDates={markedObject}
        />
      </View>
    );
  }
}

WixCalendar.propTypes = {
  nowDate: PropTypes.string.isRequired,
  saveDate: PropTypes.func.isRequired,
  datas: PropTypes.shape({
    id: PropTypes.string,
    score: PropTypes.string,
    date: PropTypes.string,
    createdAt: PropTypes.number,
  }).isRequired,
};
