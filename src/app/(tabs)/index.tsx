import { StyleSheet ,FlatList, ActivityIndicator } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Stack } from 'expo-router';
import StockListItem from '@/components/StockListItem';
import { useQuery,gql } from '@apollo/client'; // it is a hook from appoloclient ask to understand

const query = gql`
query MyQuery($symbol: String) {
  quotes(symbol: $symbol) {
    value {
      name
      symbol
      percent_change
      close
    }
  }
}
`   // creating the gql query for the required symbol 
export default function TabOneScreen() {

  
 const{data,loading,error}= useQuery(query,{
  variables:{symbol:'AAPL,IBM,MSFT,F,TSLA,META,NVDA'}
 });
 if(loading){
  return <ActivityIndicator/>
 }
 if(error){
  return<Text> Failed to fetch stocks</Text>
 }
const stocks = data.quotes.map((q: { value: any; })=> q.value)
 
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:'Stocks'}}/>
      <FlatList
      data={stocks}
      renderItem={({item}) => <Text><StockListItem stock={item}/></Text>
    
    }
    contentContainerStyle={{gap:10, padding:10}} // gap between name of stocks
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  
  },
});
