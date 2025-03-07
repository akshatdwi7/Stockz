import {  Text, View } from '@/components/Themed'
import { useLocalSearchParams ,Stack} from 'expo-router'
import React from 'react'
import top5 from '../../assets/data/top5.json'
import StockListItem from '@/components/StockListItem'
import Graph from '@/components/Graph'
 
const StockDetails = () => {
  const{symbol}= useLocalSearchParams();
  const stock = top5[symbol];
  if(!stock){
    return <Text> stock with {symbol}could not be found</Text>
  }

  return (
    <View style={{padding:10}}>
      <Stack.Screen options={{title:stock.symbol,headerBackTitle:'back'}}/>
     <StockListItem stock ={stock} />
     <Graph />
    </View>
  )
}

export default StockDetails;

