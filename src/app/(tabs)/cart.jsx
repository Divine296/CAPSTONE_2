import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const snacks = [
  { id: "1", name: "Benignit", price: 25 },
];

export default function SnacksScreen() {
  const [cart, setCart] = useState({});
  const router = useRouter();

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        quantity: (prev[item.id]?.quantity || 0) + 1,
      },
    }));
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      if (!prev[item.id]) return prev;
      const updatedQuantity = prev[item.id].quantity - 1;
      if (updatedQuantity <= 0) {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [item.id]: { ...item, quantity: updatedQuantity },
      };
    });
  };

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={snacks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price}</Text>
            <View style={styles.controls}>
              <TouchableOpacity onPress={() => removeFromCart(item)}>
                <Ionicons name="remove-circle-outline" size={24} color="red" />
              </TouchableOpacity>
              <Text style={styles.quantity}>
                {cart[item.id]?.quantity || 0}
              </Text>
              <TouchableOpacity onPress={() => addToCart(item)}>
                <Ionicons name="add-circle-outline" size={24} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Floating Cart */}
      {total > 0 && (
        <TouchableOpacity
          style={styles.floatingCart}
          onPress={() => router.push("/Cart")} // ✅ Directly go to cart.jsx
        >
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.cartText}>₱{total} • Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  foodName: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  price: { fontSize: 16, color: "gray", textAlign: "center", marginBottom: 10 },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  quantity: { marginHorizontal: 10, fontSize: 16 },
  floatingCart: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 30,
  },
  cartText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});
