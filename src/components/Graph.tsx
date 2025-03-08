import { Text, View } from "./Themed";
import { LineGraph, GraphPoint } from "react-native-graph";
import Colors from "@/constants/Colors";
import timeseries from "../../assets/data/timeseries.json";
import { FontWeight, point } from "@shopify/react-native-skia";
import { MonoText } from "./StyledText";
import { green } from "react-native-reanimated/lib/typescript/Colors";
import { useState } from "react";

const Graph = () => {

  const points: GraphPoint[] = timeseries.values.map((value) => ({
    date: new Date(value.datetime),
    value: Number.parseFloat(value.close),
  }));
  const [selectedPoint, setSelectedPoint] = useState<GraphPoint>(
    points[points.length - 1]
  );
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
