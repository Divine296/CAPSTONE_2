import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

export default function CategoryItem({ image, title, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6600", // ✅ solid orange
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 4,
  },
  iconContainer: {
    marginBottom: 2, // ⬅️ reduced spacing between icon and text
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 15,
    fontWeight: "900", // ✅ bold text
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
