import { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function OrdersScreen() {
  const [time, setTime] = useState(new Date());
  const [countdown, setCountdown] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    // Update real-time clock
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Countdown for order
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(countdownTimer);
    };
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold mb-4">⏰ Current Time</Text>
      <Text className="text-lg mb-6">{time.toLocaleTimeString()}</Text>

      <Text className="text-xl font-semibold mb-4">🍲 Order ETA</Text>
      <Text className="text-2xl text-orange-500 font-bold">
        {formatTime(countdown)}
      </Text>
    </View>
  );
}
