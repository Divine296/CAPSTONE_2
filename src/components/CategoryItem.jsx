import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function CategoryItem({ image, title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f97316", // Tailwind orange-500
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Elevation for Android
    elevation: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,                   // slightly larger
    fontWeight: "700",              // bolder
    textShadowColor: "rgba(0,0,0,0.25)", // subtle shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
