import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  Animated,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentPage() {
  const router = useRouter();
  const { orderType, total, selectedTime } = useLocalSearchParams();
  const [selectedPayment, setSelectedPayment] = useState(null);

  let [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  if (!fontsLoaded) return null;

  if (!orderType || !total || !selectedTime) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Missing order details. Go back to the cart.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Back to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    Alert.alert(
      "Payment Selected",
      `You chose ${method.toUpperCase()} for your ${orderType.toUpperCase()} order.\nTotal: ₱${parseFloat(total).toFixed(
        2
      )}\nPickup Time: ${selectedTime}`
    );
  };

  return (
    <View style={styles.container}>
      {/* Header remains untouched */}
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
            <Text style={styles.headerTitle}>Payment Page</Text>
            <Ionicons name="card-outline" size={26} color="black" />
          </View>
        </View>
      </ImageBackground>

      {/* Receipt-style Order Summary */}
      <View style={styles.receiptCard}>
        <Text style={styles.receiptHeader}>Order Receipt</Text>
        <View style={styles.line} />

        <View style={styles.receiptRow}>
          <Text style={styles.label}>Order Type</Text>
          <Text style={styles.value}>{orderType.toUpperCase()}</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.label}>Pickup Time</Text>
          <Text style={styles.value}>{selectedTime}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.receiptRow}>
          <Text style={[styles.label, { fontWeight: "bold" }]}>Total</Text>
          <Text style={[styles.value, { fontWeight: "bold" }]}>
            ₱{parseFloat(total).toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Payment Options */}
      <TouchableOpacity
        style={[
          styles.paymentBtn,
          selectedPayment === "gcash" ? styles.selectedBtn : {},
        ]}
        onPress={() => handlePaymentSelect("gcash")}
      >
        <Image
          source={require("../../../assets/gcash.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.paymentText}>Pay with GCash</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentBtn,
          selectedPayment === "counter" ? styles.selectedBtn : {},
        ]}
        onPress={() => handlePaymentSelect("counter")}
      >
        <Image
          source={require("../../../assets/cash.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.paymentText}>Pay at Counter</Text>
      </TouchableOpacity>
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
  headerTitle: { fontSize: 28, fontFamily: "Roboto_700Bold", color: "#1F2937" },

  // Receipt-style card
  receiptCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    marginVertical: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  receiptHeader: { fontSize: 20, fontFamily: "Roboto_700Bold", marginBottom: 12, color: "#333" },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: { fontSize: 16, fontFamily: "Roboto_400Regular", color: "#555" },
  value: { fontSize: 16, fontFamily: "Roboto_700Bold", color: "#333" },
  line: { borderBottomColor: "#ccc", borderBottomWidth: 1, marginVertical: 8 },

  paymentBtn: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%", // slightly smaller
    paddingVertical: 14, // smaller padding
    borderRadius: 16,
    justifyContent: "center",
    marginVertical: 8,
    alignSelf: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  selectedBtn: {
    backgroundColor: "#ffe5cc", // soft orange background
    shadowColor: "#ff944d",
    shadowOpacity: 0.9,
    elevation: 6,
  },
  paymentText: { color: "#333", fontFamily: "Roboto_700Bold", fontSize: 16, marginLeft: 12 },
  icon: { width: 60, height: 40 }, // bigger but not cropped

  errorText: {
    fontSize: 18,
    color: "#C00F0C",
    fontFamily: "Roboto_700Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: "#f97316",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#e67e22",
    alignSelf: "center",
  },
  backBtnText: { color: "#fff", fontFamily: "Roboto_700Bold", fontSize: 16 },
});
