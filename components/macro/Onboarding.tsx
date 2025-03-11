import { StackProps, View, XStack, YStack } from "tamagui";
import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import Text from "@/components/atoms/Text";
import Screen from "@/components/atoms/Screen";
import { Button } from "@/components/atoms/Button";

import { OnboardingType } from "@/utils/interfaces/dataTypes";
import ScrollView from "@/components/atoms/ScrollView";

const onboardingPages: OnboardingType[] = [
  {
    id: 1,
    image: "@/assets/images/",
    title: "Thought Bubble",
    description:
      "Start journaling with AI-powered sentiment insights to better understand your thoughts and emotions",
    button: () => {},
  },
  {
    id: 2,
    image: "@/assets/images/",
    title: "Capture your thoughts. Understand your emotions.",
    description:
      "Our AI analyzes your journal entries, giving you sentiment-based insights to help you track and improve your emotional well-being",
    button: () => {},
  },
  {
    id: 3,
    image: "@/assets/images/",
    title: "Safe. Secure. Private",
    description:
      "Your thoughts are yours alone. We never share or store your personal data. Your journal is encrypted for complete privacy",
    button: () => {},
  },
];

// TODO: After modifying Screen update it to accept the onLayout prop
// FIX: Pagination dots appear at the very bottom of the screen
const Onboarding = () => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

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
    <Screen>
      <View flex={1} width="100%" onLayout={handleLayout}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {onboardingPages.map((item, index) => (
            <YStack
              key={index + 1}
              justifyContent="flex-start"
              alignItems="center"
              width={containerWidth || "100%"}
              padding={"$3"}
            >
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </YStack>
          ))}
        </ScrollView>
        <XStack justifyContent="center" paddingVertical="$4" gap={4}>
          {onboardingPages.map((_, index) => (
            <View
              key={index}
              width={8}
              height={8}
              borderRadius={4}
              backgroundColor={currentPage === index ? "$grey2" : "$grey4"}
            />
          ))}
        </XStack>
      </View>
    </Screen>
  );
};

export default Onboarding;
