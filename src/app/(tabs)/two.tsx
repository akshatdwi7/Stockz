import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { Text, View } from "@/components/Themed";
import StockListItem from "@/components/StockListItem";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query MyQuery($user_id: String!) {
    favoritesByUser_id(user_id: $user_id) {
      id
      symbol
      user_id
    }
  }
`;

export default function TabTwoScreen() {
  const { loading, error, data } = useQuery(query, {
    variables: { user_id: "vadim" },
  });
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  console.log(data);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Favourties" }} />
      <FlatList
        data={[]}
        renderItem={({ item }) => (
          <Text>
            <StockListItem stock={item} />
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
