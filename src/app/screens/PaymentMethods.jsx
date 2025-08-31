import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const PaymentRow = ({ type, last4, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.rowCard}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <MaterialCommunityIcons
        name={type === "Visa" ? "credit-card-outline" : "credit-card"}
        size={24}
        color="#4B5563"
        style={{ marginRight: 12 }}
      />
      <Text style={styles.rowText}>
        {type} •••• {last4}
      </Text>
    </View>
    <Feather name="chevron-right" size={20} color="#C6C6C6" />
  </TouchableOpacity>
);

export default function PaymentMethodsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [cards, setCards] = useState([
    { id: 1, type: "Visa", last4: "1234" },
    { id: 2, type: "Mastercard", last4: "5678" },
  ]);

  const addNewCard = () => {
    Alert.alert("Add New Card", "This would open a card input form.");
  };

  const editCard = (id) => {
    Alert.alert("Edit Card", `This would edit card with id ${id}.`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="#F07F13" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment Methods</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}>
        {cards.map((card) => (
          <PaymentRow
            key={card.id}
            type={card.type}
            last4={card.last4}
            onPress={() => editCard(card.id)}
          />
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={addNewCard}>
          <Feather name="plus" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addBtnText}>Add New Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#0f172a" },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    elevation: 1,
  },
  rowText: { fontSize: 16, color: "#111" },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F07F13",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
  },
  addBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
