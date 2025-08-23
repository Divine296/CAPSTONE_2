import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useCart } from "../../../context/CartContext"; // ✅ Import your global cart

const { width } = Dimensions.get("window");

const drinks = [
  { id: "d1", name: "Water 350ml", price: 10 },
  { id: "d2", name: "Water 500ml", price: 15 },
  { id: "d3", name: "Water 1L", price: 25 },
  { id: "d4", name: "Royal", price: 20 },
  { id: "d5", name: "Coke", price: 20 },
  { id: "d6", name: "Sprite", price: 20 },
  { id: "d7", name: "C2", price: 18 },
  { id: "d8", name: "Yakult", price: 15 },
];

export default function Drinks() {
  const router = useRouter();
  const { addToCart } = useCart(); // ✅ Use global cart
  const [qtyMap, setQtyMap] = useState({});

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (!fontsLoaded) return null;

  const increaseQty = (item) => {
    setQtyMap((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  };

  const decreaseQty = (item) => {
    setQtyMap((prev) => {
      const newQty = (prev[item.id] || 0) - 1;
      return { ...prev, [item.id]: newQty > 0 ? newQty : 0 };
    });
  };

  const handleCheckout = () => {
    Object.entries(qtyMap).forEach(([itemId, qty]) => {
      const item = drinks.find((d) => d.id === itemId);
      for (let i = 0; i < qty; i++) {
        addToCart(item); // ✅ Add to global cart
      }
    });
    router.push("/cart"); // Go to CartScreen
  };

  const renderItem = ({ item }) => {
    const qty = qtyMap[item.id] || 0;

    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₱{item.price}</Text>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => decreaseQty(item)}>
            <Ionicons name="remove" size={18} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.qty}>{qty}</Text>

          <TouchableOpacity style={styles.controlBtn} onPress={() => increaseQty(item)}>
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const totalPrice = Object.entries(qtyMap).reduce((sum, [itemId, qty]) => {
    const item = drinks.find((d) => d.id === itemId);
    return sum + item.price * qty;
  }, 0);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/drop_1.png")}
        resizeMode="cover"
        style={styles.headerBackground}
      >
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Drinks</Text>
            <Ionicons name="fast-food-outline" size={26} color="black" />
          </View>
        </View>
      </ImageBackground>

      <FlatList
        data={drinks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
      />

      {/* Floating Cart */}
      {totalPrice > 0 && (
        <TouchableOpacity style={styles.floatingCart} onPress={handleCheckout}>
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.cartText}>₱{totalPrice} • Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const CARD_WIDTH = (width - 40) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfdfd" },
  headerBackground: { width: "100%", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: "hidden", paddingBottom: 8 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(254,192,117,0.5)" },
  headerContainer: { paddingTop: 50, paddingBottom: 12, paddingHorizontal: 12 },
  headerTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { fontSize: 30, fontFamily: "Roboto_700Bold", color: "#1F2937", textAlign: "center", flex: 1, marginHorizontal: 10 },

  card: {
    backgroundColor: "#fff",
    width: CARD_WIDTH,
    marginVertical: 10,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#f97316",
  },
  name: { fontSize: 16, fontFamily: "Roboto_700Bold", color: "#333", marginBottom: 4, textAlign: "center" },
  price: { fontSize: 14, color: "#777", marginBottom: 8 },
  controls: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 6 },
  controlBtn: { backgroundColor: "#e67e22", padding: 6, borderRadius: 20, marginHorizontal: 6 },
  qty: { fontSize: 16, fontWeight: "bold", color: "#333", minWidth: 20, textAlign: "center" },

  floatingCart: { position: "absolute", bottom: 20, left: 20, right: 20, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#27ae60", paddingVertical: 14, borderRadius: 30, elevation: 4 },
  cartText: { color: "#fff", fontWeight: "600", marginLeft: 8, fontSize: 16 },
});
