// src/app/(stack)/categories/ComboMeals.jsx
import React from "react";
import { View, Text, FlatList, Image, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

const comboItems = [
  { id: "1", title: "Family Feast", image: "https://via.placeholder.com/100" },
  { id: "2", title: "Burger & Fries Combo", image: "https://via.placeholder.com/100" },
  { id: "3", title: "Pizza & Soda Combo", image: "https://via.placeholder.com/100" },
];

export default function ComboMeals() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Combo Meals</Text>
      <FlatList
        data={comboItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => router.push({ pathname: "/(stack)/DishDetail", params: { dish: item.title } })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.itemText}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFE6C7", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 12, backgroundColor: "#fff", padding: 10, borderRadius: 10 },
  image: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  itemText: { fontSize: 18, fontWeight: "600" },
});
