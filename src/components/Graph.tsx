import { Text, View } from "./Themed";
import { LineGraph, GraphPoint } from "react-native-graph";
import Colors from "@/constants/Colors";
import timeseries from "../../assets/data/timeseries.json";
import { FontWeight, point } from "@shopify/react-native-skia";
import { MonoText } from "./StyledText";
import { green } from "react-native-reanimated/lib/typescript/Colors";
import { useState } from "react";
import { useQuery,gql } from "@apollo/client";
import { ActivityIndicator } from "react-native";

const query = gql`
query MyQuery($symbol: String!, $interval: String!) {
  time_series(interval: $interval, symbol: $symbol) {
    values {
      datetime
      close
    }
  }
}
`

const Graph = ({symbol}:{symbol:string}) => {
  const [selectedPoint, setSelectedPoint] = useState<GraphPoint>();
    const{data,loading,error}=useQuery(query,{
      variables:{
        symbol,
        interval:'1day',
      },
    });

    if(loading){
      return <ActivityIndicator/>
    }
    if(error){
      return <Text> Trying but error</Text>
    }
    console.log(data)

  const points: GraphPoint[] = data.time_series.values.map((value) => ({
    date: new Date(value.datetime),
    value: Number.parseFloat(value.close),
  }));

  const onPointSelected = (point: GraphPoint) => {
    setSelectedPoint(point);
  };

  return (
    <View>
      <MonoText style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>
        ${selectedPoint?.value.toFixed(1)}
      </MonoText>
      <Text style={{ color: "grey" }}>
        {selectedPoint?.date.toDateString()}
      </Text>

      <LineGraph
        style={{ width: "100%", height: 300, }}
        points={points}
        animated={true}
        color={Colors.light.tint}
        gradientFillColors={[Colors.light.tint, "#7476df00"]}
        enablePanGesture
        onPointSelected={onPointSelected}
        enableFadeInMask
        enableIndicator
        indicatorPulsating
      />
    </View>
  );
};

export default Graph;
