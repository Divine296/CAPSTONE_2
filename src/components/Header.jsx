import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Bell, Settings, Search } from "lucide-react-native";

export default function Header() {
  return (
    <ImageBackground
      source={require("../../assets/drop_1.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      {/* Semi-transparent orange overlay */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Top row: Home + Icons */}
        <View style={styles.topRow}>
          {/* Left: Home */}
          <View style={styles.homeRow}>
            <Text style={styles.homeText}>Home</Text>
          </View>

          {/* Right: Bell + Settings */}
          <View style={styles.iconsRow}>
            <TouchableOpacity style={styles.bellContainer}>
              <Bell size={26} color="black" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <Settings size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={18} color="#6B7280" />
          <TextInput
            placeholder="Search Dish"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    paddingBottom: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(254,192,117,0.5)",
  },
  container: {
    paddingTop: 48,
    paddingBottom: 18,
    paddingHorizontal: 0,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginBottom: 22,
  },
  homeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  homeText: {
    fontSize: 30,
    fontWeight: "900",
    color: "black",
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellContainer: {
    marginRight: 16,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#374151",
  },
});
