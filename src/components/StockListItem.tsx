import { Text } from "./Themed";


type Stock={
    name: string
    symbol:string
}
type StockListItem={
    stock: Stock
}
 export default function StockListItem({stock}:StockListItem){
    return <Text>{stock.symbol}</Text>
 }