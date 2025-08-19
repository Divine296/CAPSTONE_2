import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import { Home, ShoppingCart, Clock, User } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#fbbf24", borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Home color={color} size={22} />,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <ShoppingCart color={color} size={22} />,
          }}
        />
        <Tab.Screen
          name="Orders"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Clock color={color} size={22} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <User color={color} size={22} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
