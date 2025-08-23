import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useRouter } from "expo-router";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

export default function CartScreen() {
  const router = useRouter();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [selectedTime, setSelectedTime] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (!fontsLoaded) return null;

  const pickupTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₱{item.price}</Text>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.controlBtn}>
            <Ionicons name="remove" size={18} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.controlBtn}>
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.trashBtn}>
        <Ionicons name="trash-outline" size={22} color="#f97316" />
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <>
      <TouchableOpacity style={styles.addMoreBtn} onPress={() => router.back()}>
        <Text style={styles.addMoreText}>+ Add more items</Text>
      </TouchableOpacity>

      <View style={styles.pickupContainer}>
        <Text style={styles.pickupLabel}>Select Pickup Time:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pickupTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.pickupTimeBtn,
                selectedTime === time && styles.pickupTimeSelected,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.pickupTimeText,
                  selectedTime === time && { color: "#fff", fontFamily: "Roboto_700Bold" },
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Receipt-style total summary with icon */}
        <View style={styles.totalSummary}>
          <View style={styles.receiptHeader}>
            <MaterialCommunityIcons name="receipt" size={22} color="#f97316" />
            <Text style={styles.receiptTitle}>Order Summary</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalAmount}>₱{total.toFixed(2)}</Text>
          </View>
          <View style={styles.dottedDivider} />
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { fontSize: 18 }]}>Total</Text>
            <Text style={[styles.totalAmount, { fontSize: 18, fontWeight: "700" }]}>₱{total.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </>
  );

  const handleProceed = () => {
    if (!selectedTime) {
      Alert.alert("Pickup Time Required", "Please select a pickup time before proceeding.");
      return;
    }
    router.push({ pathname: "/cart/checkout", params: { total, selectedTime } });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={require("../../../assets/drop_1.png")}
        resizeMode="cover"
        style={styles.headerBackground}
      >
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Cart</Text>
            <Ionicons name="cart-outline" size={26} color="black" />
          </View>
        </View>
      </ImageBackground>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 12, paddingBottom: 150 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListFooterComponent={renderFooter}
        />
      )}

      {/* Proceed to Payment button */}
      {total > 0 && (
        <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
          <Text style={styles.proceedText}>Proceed to Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfdfd" },

  headerBackground: {
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    paddingBottom: 8,
  },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(254,192,117,0.5)" },
  headerContainer: { paddingTop: 50, paddingBottom: 12, paddingHorizontal: 12 },
  headerTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { fontSize: 30, fontFamily: "Roboto_700Bold", color: "#1F2937" },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#f97316",
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 14 },
  details: { flex: 1 },
  name: { fontSize: 16, fontFamily: "Roboto_700Bold", color: "#333" },
  price: { fontSize: 14, fontFamily: "Roboto_400Regular", color: "#777", marginVertical: 6 },
  controls: { flexDirection: "row", alignItems: "center" },
  controlBtn: { backgroundColor: "#e67e22", padding: 6, borderRadius: 20, marginHorizontal: 6 },
  qty: { fontSize: 16, fontFamily: "Roboto_700Bold", color: "#333", minWidth: 20, textAlign: "center" },
  trashBtn: { padding: 8, borderRadius: 10, backgroundColor: "#fff5eb" },

  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { marginTop: 12, fontSize: 18, fontFamily: "Roboto_400Regular", color: "#999" },

  addMoreBtn: { 
    backgroundColor: "#f97316",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "stretch",
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  addMoreText: { 
    fontSize: 16, 
    fontFamily: "Roboto_700Bold", 
    color: "#fff" 
  },

  pickupContainer: { paddingHorizontal: 12, marginVertical: 10 },
  pickupLabel: { fontSize: 16, fontFamily: "Roboto_700Bold", color: "#333", marginBottom: 6 },
  pickupTimesRow: { flexDirection: "row", flexWrap: "wrap" },
  pickupTimeBtn: {
    borderWidth: 1,
    borderColor: "#f97316",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  pickupTimeSelected: { backgroundColor: "#f97316" },
  pickupTimeText: { fontSize: 14, fontFamily: "Roboto_400Regular", color: "#333" },

  totalSummary: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  receiptHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  receiptTitle: {
    fontSize: 16,
    fontFamily: "Roboto_700Bold",
    color: "#f97316",
    marginLeft: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: "Roboto_700Bold",
    color: "#555",
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: "Roboto_700Bold",
    color: "#111",
  },
  dottedDivider: {
    borderStyle: "dotted",
    borderWidth: 0.8,
    borderColor: "#ccc",
    marginVertical: 6,
  },

  proceedBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#27ae60",
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  proceedText: { color: "#fff", fontFamily: "Roboto_700Bold", fontSize: 16 },
});
