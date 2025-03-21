import { useTheme, XStack } from "tamagui";
import { TextInput, StyleSheet } from "react-native";

import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { useState } from "react";

const BugReport = () => {
  const theme = useTheme();
  const [message, setMessage] = useState<string | undefined>(undefined);

  const styles = StyleSheet.create({
    MessageInput: {
      borderColor: "#ccc",
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 16,
      color: "#333",
      backgroundColor: theme.grey2.get(),
      marginVertical: 8,
      width: "100%",
      textAlignVertical: "top",
      minHeight: 300,
    },
  });

  return (
    <Screen
      backgroundColor="$grey1"
      width="100%"
      justifyContent="flex-start"
      padding="$lg"
    >
      <XStack>
        <Text weight="bold" fontSize="$xl">
          Report A Bug
        </Text>
      </XStack>
      <XStack>
        <TextInput
          style={styles.MessageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Explain the bug"
          multiline={true}
          numberOfLines={10}
        />
      </XStack>
      <XStack width="100%" justifyContent="flex-end">
        <Button type="normal" size="$sm" width="50%">
          <Button.Text>Submit</Button.Text>
        </Button>
      </XStack>
    </Screen>
  );
};

export default BugReport;
