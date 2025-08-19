import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import CategoryItem from "./CategoryItem";

const categories = [
  { id: "1", title: "Combo Meals", image: require("../../assets/choices/combo.png") },
  { id: "2", title: "Drinks", image: require("../../assets/choices/drinks.png") },
  { id: "3", title: "Snacks", image: require("../../assets/choices/snacks.png") },
  { id: "4", title: "Meals", image: require("../../assets/choices/meals.png") },
];

export default function Categories() {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.underline} />
    </View>
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CategoryItem
          image={item.image}
          title={item.title}
          onPress={() => alert(`You selected: ${item.title}`)}
        />
      )}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      numColumns={2} // ✅ make grid
      columnWrapperStyle={styles.row} // ✅ adds spacing between columns
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700", // Bold
    color: "black",
  },
  underline: {
    height: 4,
    width: 56,
    backgroundColor: "#f97316",
    borderRadius: 4,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 24,
    paddingHorizontal: 8,
  },
  row: {
    justifyContent: "space-between", // ✅ keeps spacing nice between 2 items
  },
});
