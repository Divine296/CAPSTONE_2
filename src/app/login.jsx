import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from "@expo-google-fonts/roboto";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = () => {
    let errs = {};
    if (!validateEmail(email)) errs.email = "Invalid email address";
    if (password.length < 6) errs.password = "Password must be at least 6 characters";
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      router.push("/(tabs)");
    }
  };

  // Load fonts
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require("../../assets/drop_3.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(255,255,255,0.6)", "rgba(255,255,255,0.3)"]}
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Bold Welcome Back */}
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue your journey</Text>

          <View style={styles.card}>
            {/* Email */}
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
              <TextInput
                style={[styles.input, {flex: 1}, errors.email && styles.inputError]}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
              <TextInput
                style={[styles.input, { flex: 1 }, errors.password && styles.inputError]}
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Ionicons
                  name={passwordVisible ? "eye" : "eye-off"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            {/* Links */}
            <TouchableOpacity onPress={() => router.push("/forgotpassword")}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.linkText}>
                Don’t have an account?{' '}
                <Text style={{ fontFamily: "Roboto_700Bold" }}>
                  Sign Up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 25, paddingVertical: 40 },
  container: { alignItems: "center", justifyContent: "flex-start", flex: 1 },
  logo: { width: 180, height: 180, marginBottom: 25 },
  title: { fontSize: 28, fontFamily: "Roboto_900Black", color: "#333", marginBottom: 5, includeFontPadding: false },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 25, textAlign: "center", fontFamily: "Roboto_400Regular" },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  inputWrapper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, backgroundColor: "#F5F5F5" },
  icon: { marginRight: 8 },
  input: { paddingVertical: 12, fontSize: 16, color: "#333", fontFamily: "Roboto_400Regular" },
  inputError: { borderColor: "red" },
  loginButton: { backgroundColor: "#FF8C00", paddingVertical: 14, borderRadius: 12, width: "100%", alignItems: "center", marginVertical: 20, shadowColor: "#FF8C00", shadowOpacity: 0.3, shadowOffset: { width: 0, height: 5 }, shadowRadius: 8, elevation: 2 },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  linkText: { color: "#FF8C00", marginTop: 10, fontSize: 15, textAlign: "center" },
  errorText: { color: "red", alignSelf: "flex-start", marginBottom: 10, marginLeft: 5, fontSize: 13 },
});
