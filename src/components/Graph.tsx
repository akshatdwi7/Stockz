import { Text, View } from "./Themed";
import { LineGraph, GraphPoint } from "react-native-graph";
import Colors from "@/constants/Colors";
import timeseries from "../../assets/data/timeseries.json";

const Graph = () => {
  const points: GraphPoint[] = timeseries.values.map((value) => ({
    date: new Date(value.datetime),
    value:Number.parseFloat(value.close)
  }));
  
  return (
    <View>
      <Text>Graph</Text>
      <LineGraph
        style={{ width: "100%", height: 300 }}
        points={points}
        animated={true}
        color={Colors.light.tint}
        gradientFillColors={[Colors.light.tint,'#000']}
      />
    </View>
  );
};

export default Graph;
