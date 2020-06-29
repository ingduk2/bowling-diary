import React, { Component } from 'react'
import {View} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

export default class WixCalendar extends Component {
    state = {
        selected:""
    }

    render() {
        console.log("WixCalendar render");
        const {selected} = this.state;
        const {saveDate} = this.props;

        return (
    <View style={{ paddingTop: 20, flex: 1 }}>
        <Calendar
        // // // Initially visible month. Default = Date()
        // current={'2020-06-07'}
        // // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={'2020-01-01'}
        // // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2020-12-31'}
        // // // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
            this.setState({
                selected:day.dateString
            });
            saveDate(day.dateString);
            console.log('selected day', day.dateString)
            console.log('selected day', day)
        }}
        // // // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {console.log('selected day', day)}}
        // // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
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
        markedDates={{
            [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: '#3399ff',
                selectedTextColor: 'white'
              }
          }}
        
        />
      </View>
     )
   }
 }