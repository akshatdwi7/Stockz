import { Text, View } from "./Themed"; // easily switches from dark and white theme
import { StyleSheet,Pressable } from "react-native";
import Colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MonoText } from "./StyledText";
import { Link } from "expo-router"; // This takes us to the page we want super easy to use expo router

type Stock = {
  name: string;
  symbol: string;
  close: string;
  percent_change: string;
};
type StockListItem = {
  stock: Stock;
};
export default function StockListItem({ stock }: StockListItem) {
    const change = Number.parseFloat(stock.percent_change)
  return (
    <Link href={`/${stock.symbol}`} asChild>
    <Pressable style={styles.container}>
         {/* left container */}
    <View style={{flex  :1 ,gap:5}}>
      <Text  style={styles.symbol}>
        {stock.symbol} <AntDesign name="staro" size={20} color="grey" />{" "}
      </Text>
      <Text style={{ color: "gray" }}>{stock.name}</Text>
      </View >
        {   /* right container */}
      <View style={{alignItems:'flex-end'}}>
        <MonoText>${Number.parseFloat(stock.close).toFixed(1)}</MonoText>
        <MonoText style={{color:change>0?'green':'red'}}>
            {change>0?'+':''}
            {change.toFixed(1)}%</MonoText>
      </View>
    </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'

    },
  symbol: { fontSize: 20, fontWeight: "bold", color: Colors.light.tint },
});
