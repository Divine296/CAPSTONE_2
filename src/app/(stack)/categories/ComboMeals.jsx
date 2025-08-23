import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useCart } from "../../../context/CartContext"; // ✅ Import global cart

const { width } = Dimensions.get("window");

const comboMeals = [
  { id: "1", name: "Rice, Vegetable, Lumpia", price: 45, image: "https://via.placeholder.com/100" },
  { id: "2", name: "Rice, Humba Egg, Ham", price: 45, image: "https://via.placeholder.com/100" },
  { id: "3", name: "Rice, Bihon/ Bam-i, Siomai", price: 45, image: "https://via.placeholder.com/100" },
  { id: "4", name: "Rice, Chorizo, Boiled Egg", price: 45, image: "https://via.placeholder.com/100" },
  { id: "5", name: "Rice, Hotdog, Ngohiong", price: 45, image: "https://via.placeholder.com/100" },
  { id: "6", name: "Rice, Fried Egg, Chorizo", price: 45, image: "https://via.placeholder.com/100" },
];

export default function ComboMeals() {
  const router = useRouter();
  const { addToCart } = useCart(); // ✅ Use global cart
  const [qtyMap, setQtyMap] = useState({}); // Local quantities

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (!fontsLoaded) return null;

  const increaseQty = (meal) => {
    setQtyMap((prev) => ({ ...prev, [meal.id]: (prev[meal.id] || 0) + 1 }));
  };

  const decreaseQty = (meal) => {
    setQtyMap((prev) => {
      const newQty = (prev[meal.id] || 0) - 1;
      return { ...prev, [meal.id]: newQty > 0 ? newQty : 0 };
    });
  };

  const handleCheckout = () => {
    Object.entries(qtyMap).forEach(([mealId, qty]) => {
      const meal = comboMeals.find((m) => m.id === mealId);
      for (let i = 0; i < qty; i++) {
        addToCart(meal); // ✅ Add to global cart
      }
    });
    router.push("/cart"); // Go to CartScreen
  };

  const renderItem = ({ item }) => {
    const qty = qtyMap[item.id] || 0;
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
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

  const totalPrice = Object.entries(qtyMap).reduce((sum, [mealId, qty]) => {
    const meal = comboMeals.find((m) => m.id === mealId);
    return sum + meal.price * qty;
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
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
            <Text style={styles.headerTitle}>Combo Meals</Text>
            <Ionicons name="fast-food-outline" size={26} color="black" />
          </View>
        </View>
      </ImageBackground>

      {/* Combo Meals List */}
      <FlatList
        data={comboMeals}
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
  image: { width: "100%", height: 100, borderRadius: 8, marginBottom: 8 },
  name: { fontSize: 16, fontFamily: "Roboto_700Bold", color: "#333", marginBottom: 4, textAlign: "center" },
  price: { fontSize: 14, color: "#777", marginBottom: 8 },

  controls: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 6 },
  controlBtn: { backgroundColor: "#e67e22", padding: 6, borderRadius: 20, marginHorizontal: 6 },
  qty: { fontSize: 16, fontWeight: "bold", color: "#333", minWidth: 20, textAlign: "center" },

  floatingCart: { position: "absolute", bottom: 20, left: 20, right: 20, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#27ae60", paddingVertical: 14, borderRadius: 30, elevation: 4 },
  cartText: { color: "#fff", fontWeight: "600", marginLeft: 8, fontSize: 16 },
});
