import { View } from "tamagui";
import Markdown from "react-native-markdown-display";

import Screen from "../atoms/Screen";
import Text from "../atoms/Text";

const styles = {
  body: {
    fontFamily: "Montserrat_400Regular",
    gap: 10,
  },
};

const message = `
---
#### Welcome to Thought Bubble! A Journaling & Sentiment Analysis App! We value your privacy. Here’s what you need to know:
#### 1. **Data We Collect:**
- Journal entries, user ID, and basic usage statistics.
#### 2. **How We Use It:**
- To personalize your experience and provide sentiment insights.
- To improve our app through anonymous data analysis.
#### 3. **Data Security:**
- All your entries are encrypted and securely stored.
- We never share your personal data with third parties unless required by law.
#### 4. **Your Rights:**
- You can access, update, or delete your data at any time.
`;

const Agreement = () => {
  return (
    <Screen
      backgroundColor="$grey0"
      width="100%"
      justifyContent="flex-start"
      paddingVertical="$xl"
    >
      <View>
        <Text weight="bold" fontSize="$xxl" textAlign="center">
          Privacy & Data Notice
        </Text>
      </View>
      <View>
        <Markdown style={styles}>{message}</Markdown>
      </View>
    </Screen>
  );
};

export default Agreement;
