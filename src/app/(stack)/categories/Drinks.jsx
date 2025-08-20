import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Drinks() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🥤 Drinks Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 22, fontWeight: "bold", color: "black" },
});
