import {  Text, View } from '@/components/Themed'
import { useLocalSearchParams ,Stack} from 'expo-router'
import React from 'react'
import StockListItem from '@/components/StockListItem'
import Graph from '@/components/Graph'
import { useQuery,gql } from '@apollo/client'
import { ActivityIndicator } from 'react-native'

const query=gql`
query MyQuery($symbol:String) {
  quote(symbol:$symbol){
    name
    symbol
    close
    percent_change
  }
}`;
 
const StockDetails = () => {
  const{symbol}= useLocalSearchParams();
  const{data,loading,error}=useQuery(query,{variables:{symbol}})
  if(loading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text> unable to fetch the data  with {symbol}</Text>
  }
  const stock=data.quote
  if(!stock){
    return <Text> stock with {symbol}could not be found</Text>
  }

  return (
    <View style={{padding:10}}>
      <Stack.Screen options={{title:stock.symbol,headerBackTitle:'back'}}/>
     <StockListItem stock ={stock} />
     <Graph symbol={stock.symbol}/>
    </View>
  )
}

export default StockDetails;

