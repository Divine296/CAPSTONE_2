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

const { width } = Dimensions.get("window");

const meals = [
  { id: "1", name: "Rice", price: 15, image: "https://via.placeholder.com/150" },
  { id: "2", name: "Bam-i", price: 30, image: "https://via.placeholder.com/150" },
  { id: "3", name: "Bihon", price: 20, image: "https://via.placeholder.com/150" },
  { id: "4", name: "Chorizo", price: 20, image: "https://via.placeholder.com/150" },
  { id: "5", name: "Corned Beef", price: 40, image: "https://via.placeholder.com/150" },
  { id: "6", name: "Beef Loaf", price: 15, image: "https://via.placeholder.com/150" },
];

export default function MealsScreen() {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  // Load Roboto font
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return null;

  const addToCart = (meal) => {
    const newCart = { ...cart };
    newCart[meal.id] = (newCart[meal.id] || 0) + 1;
    setCart(newCart);
    setTotal(total + meal.price);
  };

  const removeFromCart = (meal) => {
    if (!cart[meal.id]) return;
    const newCart = { ...cart };
    newCart[meal.id] -= 1;
    if (newCart[meal.id] <= 0) delete newCart[meal.id];
    setCart(newCart);
    setTotal(total - meal.price);
  };

  const renderItem = ({ item }) => {
    const qty = cart[item.id] || 0;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₱{item.price}</Text>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => removeFromCart(item)}
          >
            <Ionicons name="remove" size={18} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.qty}>{qty}</Text>

          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => addToCart(item)}
          >
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <View style={styles.container}>
      {/* Custom Header */}
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

            <Text style={styles.headerTitle}>Meals</Text>

            <Ionicons name="fast-food-outline" size={26} color="black" />
          </View>
        </View>
      </ImageBackground>

      {/* Meals Grid */}
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
      />

      {/* Floating Cart */}
      {total > 0 && (
        <TouchableOpacity
          style={styles.floatingCart}
          onPress={() => router.push("/cart")}
        >
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.cartText}>₱{total} • Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const CARD_WIDTH = (width - 40) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfdfd" },

  headerBackground: {
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    paddingBottom: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(254,192,117,0.5)",
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: "Roboto_700Bold",
    color: "#1F2937",
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1.5,
    textDecorationColor: "#F59E0B",
    textDecorationStyle: "solid",
  },

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
    borderWidth: 2,        // ✅ Orange border added
    borderColor: "#f97316", // ✅ Orange border color
  },
  image: { width: "100%", height: 100, borderRadius: 8, marginBottom: 8 },
  name: { 
    fontSize: 16, 
    fontFamily: "Roboto_700Bold", // ✅ Roboto bold
    color: "#333",
    marginBottom: 4,
  },
  price: { fontSize: 14, color: "#777", marginBottom: 8 },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  controlBtn: {
    backgroundColor: "#e67e22",
    padding: 6,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  qty: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    minWidth: 20,
    textAlign: "center",
  },

  floatingCart: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27ae60",
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 4,
  },
  cartText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 16,
  },
});
