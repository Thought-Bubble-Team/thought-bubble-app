import { StackProps, View, XStack, YStack } from "tamagui";
import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Image } from "expo-image";

import Text from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";

import ScrollView from "@/components/atoms/ScrollView";
import { router } from "expo-router";

// TODO: After modifying Screen update it to accept the onLayout prop
// FIX: Pagination dots appear at the very bottom of the screen
const Onboarding = () => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  // @ts-ignore
  const handleLayout: StackProps["onLayout"] = (event) => {
    if (event?.nativeEvent?.layout?.width) {
      setContainerWidth(event.nativeEvent.layout.width);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (containerWidth > 0) {
      const offsetX = event.nativeEvent.contentOffset.x;
      const page = Math.round(offsetX / containerWidth);
      setCurrentPage(page);
    }
  };

  return (
    <View
      testID="onboarding-component-container"
      position="absolute"
      left={0}
      right={0}
      bottom={0}
      width={"100%"}
      height="90%"
      paddingHorizontal={"$4"}
      paddingVertical={"$8"}
      backgroundColor={"$grey1"}
      borderTopLeftRadius={32}
      borderTopRightRadius={32}
      elevationAndroid={8}
    >
      <View width="100%" onLayout={handleLayout}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {/* Page 1 */}
          <YStack
            key={1}
            justifyContent="center"
            alignItems="center"
            width={containerWidth || "100%"}
            padding={"$3"}
            gap={24}
          >
            <Image
              source={require("@/assets/images/onboarding_images/ob_page_1.png")}
              contentFit="cover"
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
            <Text
              weight="bold"
              fontSize={27}
              lineHeight={27}
              textAlign="center"
            >
              Thought Bubble
            </Text>
            <Text fontSize="$lg" lineHeight={22} textAlign="center">
              Start journaling with AI-powered sentiment insights to better
              understand your thoughts and emotions.
            </Text>
          </YStack>

          {/* Page 2 */}
          <YStack
            key={2}
            justifyContent="center"
            alignItems="center"
            width={containerWidth || "100%"}
            padding={"$3"}
            gap={24}
          >
            <Image
              source={require("@/assets/images/onboarding_images/ob_page_2.png")}
              contentFit="cover"
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
            <Text
              weight="bold"
              fontSize={27}
              lineHeight={27}
              textAlign="center"
            >
              Capture your thoughts. Understand your emotions.
            </Text>
            <Text fontSize="$lg" lineHeight={22} textAlign="center">
              Our AI analyzes your journal entries in real time, giving you
              sentiment-based insights to help you track and improve your
              emotional well-being.
            </Text>
          </YStack>

          {/* Page 3 */}
          <YStack
            key={3}
            justifyContent="center"
            alignItems="center"
            width={containerWidth || "100%"}
            padding={"$3"}
            gap={24}
          >
            <Image
              source={require("@/assets/images/onboarding_images/ob_page_3.png")}
              contentFit="cover"
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
            <Text
              weight="bold"
              fontSize={27}
              lineHeight={27}
              textAlign="center"
            >
              Safe. Secure. Private
            </Text>
            <Text fontSize="$lg" lineHeight={22} textAlign="center">
              Your thoughts are yours alone. We never share or store your
              personal data. Your journal is encrypted for complete privacy.
            </Text>
          </YStack>

          {/* Page 4 */}
          <YStack
            key={4}
            justifyContent="center"
            alignItems="center"
            width={containerWidth || "100%"}
            padding={"$3"}
            gap={24}
          >
            <Image
              source={require("@/assets/images/onboarding_images/ob_page_4.png")}
              contentFit="cover"
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
            <Text
              weight="bold"
              fontSize={27}
              lineHeight={27}
              textAlign="center"
            >
              Start your journaling journey today!
            </Text>
            <Text fontSize="$lg" lineHeight={22} textAlign="center">
              Take the first step in understanding your emotions and improving
              your mental well-being.
            </Text>
            <Button
              type="normal"
              onPress={() =>
                router.replace({
                  pathname: "/profile_setup",
                  params: { type: "new" },
                })
              }
            >
              <Button.Text>Get Started</Button.Text>
            </Button>
          </YStack>
        </ScrollView>
        <XStack justifyContent="center" paddingVertical="$4" gap={4}>
          <View
            key={0}
            width={currentPage === 0 ? "$xl" : "$sm"}
            height={8}
            borderRadius={4}
            backgroundColor={currentPage === 0 ? "$primary" : "$grey4"}
          />
          <View
            key={1}
            width={currentPage === 1 ? "$xl" : "$sm"}
            height={8}
            borderRadius={4}
            backgroundColor={currentPage === 1 ? "$primary" : "$grey4"}
          />
          <View
            key={2}
            width={currentPage === 2 ? "$xl" : "$sm"}
            height={8}
            borderRadius={4}
            backgroundColor={currentPage === 2 ? "$primary" : "$grey4"}
          />
          <View
            key={3}
            width={currentPage === 3 ? "$xl" : "$sm"}
            height={8}
            borderRadius={4}
            backgroundColor={currentPage === 3 ? "$primary" : "$grey4"}
          />
        </XStack>
      </View>
    </View>
  );
};

export default Onboarding;
