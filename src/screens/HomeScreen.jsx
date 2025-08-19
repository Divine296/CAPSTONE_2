import React from "react";
import { SafeAreaView, FlatList, View, Text, StyleSheet } from "react-native";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";
import Header from "../components/Header";
import CategoryItem from "../components/CategoryItem";
import Recommended from "../components/Recommended"; // new Recommended component

// Categories data
const categoriesData = [
  { id: "1", title: "Combo Meals", image: require("../../assets/choices/combo.png") },
  { id: "2", title: "Meals", image: require("../../assets/choices/meals.png") },
  { id: "3", title: "Snacks", image: require("../../assets/choices/snacks.png") },
  { id: "4", title: "Drinks", image: require("../../assets/choices/drinks.png") },
];

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
  });

  if (!fontsLoaded) return null;

  // Render Categories header
const renderCategoriesHeader = () => (
  <View style={[styles.sectionContainer, { marginTop: 16 }]}>
    <Text style={[styles.sectionTitle, { fontFamily: "Roboto_700Bold" }]}>
      Categories
    </Text>
    <View style={styles.underline} />
  </View>
);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFE6C7" }}>
      <FlatList
        data={categoriesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryItem
            image={item.image}
            title={item.title}
            onPress={() => alert(`You selected: ${item.title}`)}
          />
        )}
      ListHeaderComponent={
  <View>
    <Header />
    <Recommended />
    {renderCategoriesHeader()}
  </View>
}

        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    color: "black",
  },
  underline: {
    height: 4,
    width: 56,
    backgroundColor: "#f97316",
    borderRadius: 4,
    marginTop: 4,
  },
});
