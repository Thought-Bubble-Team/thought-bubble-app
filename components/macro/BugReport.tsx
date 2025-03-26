import { useTheme, XStack } from "tamagui";
import { TextInput, StyleSheet, Alert } from "react-native";

import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { useState } from "react";
import { submitBugReport } from "@/utils/supabase/db-crud";

const BugReport = () => {
  const theme = useTheme();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!message || message === "") {
      Alert.alert("Empty Report", "Cannot have an empty report message");
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting");
      await submitBugReport(message);

      Alert.alert("Success", "Thank you for reporting a bug");
    } catch {
      Alert.alert(
        "Error",
        "There was an error when submitting a bug report. Please try again later"
      );
    }
    setLoading(false);
  };

  const styles = StyleSheet.create({
    MessageInput: {
      borderColor: "#ccc",
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 16,
      color: theme.black.get(),
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
          placeholderTextColor={theme.black.get()}
          multiline={true}
          numberOfLines={10}
        />
      </XStack>
      <XStack width="100%" justifyContent="center">
        <Button type="normal" size="$sm" onPress={handleSubmit}>
          {loading && <Button.Spinner />}
          {!loading && <Button.Text>Submit</Button.Text>}
        </Button>
      </XStack>
    </Screen>
  );
};

export default BugReport;
