// app/(tabs)/index.jsx
import React from "react";
import { SafeAreaView, FlatList, View, Text, StyleSheet } from "react-native";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import CategoryItem from "../../components/CategoryItem";
import Recommended from "../../components/Recommended";

// Categories data
const categoriesData = [
  { id: "1", title: "ComboMeals", image: require("../../../assets/choices/combo.png") },
  { id: "2", title: "Meals", image: require("../../../assets/choices/meals.png") },
  { id: "3", title: "Snacks", image: require("../../../assets/choices/snacks.png") },
  { id: "4", title: "Drinks", image: require("../../../assets/choices/drinks.png") },
];

export default function Home() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold });
  const router = useRouter();

  if (!fontsLoaded) return null;

  const renderCategoriesHeader = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { fontFamily: "Roboto_700Bold" }]}>
        Categories
      </Text>
      <View style={styles.underline} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFE6C7" }}>
      <Header />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={categoriesData}
          key={"two-columns"}
          numColumns={2}
          columnWrapperStyle={styles.row}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryItem
              image={item.image}
              title={item.title}
              onPress={() => router.push(`/categories/${item.title}`)} // ✅ Auto navigate
            />
          )}
          ListHeaderComponent={
            <View style={{ marginBottom: 8 }}>
              <Recommended />
              {renderCategoriesHeader()}
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 8 }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: { paddingHorizontal: 8, marginTop: 12, marginBottom: 6 },
  sectionTitle: { fontSize: 20, color: "black" },
  underline: {
    height: 3,
    width: 48,
    backgroundColor: "#f97316",
    borderRadius: 3,
    marginTop: 4,
  },
  row: { justifyContent: "space-between", marginBottom: 10 },
});
