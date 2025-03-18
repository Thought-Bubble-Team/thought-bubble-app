// AnimatedLogo.js
import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, StyleSheet } from "react-native";
import { G } from "react-native-svg";
import LogoTemp from "@/assets/icons/logoTemp.svg";
import Logo from "@/assets/icons/emojis/joy.svg";

// FIX: AnimatedG not bouncing
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedLogo = () => {
  // Animated value for rotation (0 to 1 mapped to our rotation keyframes)
  const rotationAnim = useRef(new Animated.Value(0)).current;

  // Animated value for bounce (if animating internal elements later)
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [rotationAnim, bounceAnim]);

  // Interpolate rotation animation to simulate overshooting for a bouncy feel
  const rotate = rotationAnim.interpolate({
    inputRange: [0, 0.7, 0.8, 0.9, 1],
    outputRange: ["0deg", "-360deg", "-375deg", "-355deg", "-360deg"],
  });

  // Bounce interpolation (if used on internal elements)
  const bounce = bounceAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -10, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        {/* <LogoTemp>
          <AnimatedG transform={`translateY(${bounce})`} id="faceFeatures" />
        </LogoTemp> */}
        <Logo />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AnimatedLogo;
