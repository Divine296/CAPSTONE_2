import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Snacks() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🍔 Snacks Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 22, fontWeight: "bold", color: "black" },
});
