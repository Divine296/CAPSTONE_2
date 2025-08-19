import React, { useState } from "react";
import { View, Text, FlatList, Image, Dimensions, Animated, StyleSheet } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("window");

const recommendedData = [
  { id: "1", image: require("../../assets/reco1.jpg"), title: "Spicy Chicken" },
  { id: "2", image: require("../../assets/reco2.jpg"), title: "Cheesy Burger" },
  { id: "3", image: require("../../assets/reco3.jpg"), title: "Fresh Salad" },
];

export default function Recommended() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended for you</Text>
      <View style={styles.underline} />

      <FlatList
        data={recommendedData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToInterval={width * 0.7 + 16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 12, marginTop: 12 }}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / (width * 0.7 + 16));
          setActiveIndex(index);
        }}
        renderItem={({ item, index }) => {
          const isActive = index === activeIndex;
          return (
            <Animated.View
              style={[
                {
                  width: width * 0.7,
                  height: width * 0.45,
                  marginHorizontal: 8,
                  borderRadius: 20,
                  overflow: "hidden",
                  transform: [{ scale: isActive ? 1 : 0.95 }],
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                  elevation: 5,
                },
              ]}
            >
              <Image source={item.image} style={styles.image} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                style={styles.gradient}
              />
              <Text style={styles.overlayText}>{item.title}</Text>
            </Animated.View>
          );
        }}
      />

      <View style={styles.dotsContainer}>
        {recommendedData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? "#f97316" : "#d1d5db" },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginTop: 16 },
  title: { fontFamily: "Roboto_700Bold", fontSize: 20, color: "black" },
  underline: { height: 4, width: 56, backgroundColor: "#f97316", borderRadius: 4, marginTop: 4 },
  image: { width: "100%", height: "100%" },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
  },
  overlayText: {
    position: "absolute",
    bottom: 12,
    left: 12,
    color: "#fff",
    fontFamily: "Roboto_700Bold",
    fontSize: 18,
  },
  dotsContainer: { flexDirection: "row", justifyContent: "center", marginTop: 12 },
  dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 4 },
});
