import { View, YStack } from "tamagui";

import Text from "@/components/atoms/Text";
import Screen from "@/components/atoms/Screen";
import { Button } from "@/components/atoms/Button";

import { OnboardingType } from "@/utils/interfaces/dataTypes";

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

const Onboarding = () => {
  return (
    <Screen>
      {onboardingPages.map((item) => (
        <YStack
          key={`page-${item.id}`}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </YStack>
      ))}
    </Screen>
  );
};
