import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  mainText: { margin: 6, height: 40, fontSize: 30 },
  row: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#bbb',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 8,
    // margin: 10,
  },
  textStyle: {
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 15,
  },
});

export default styles;
