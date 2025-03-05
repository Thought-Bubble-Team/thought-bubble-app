import { View } from "tamagui";
import { useLocalSearchParams, Stack } from "expo-router";

import Text from "@/components/atoms/Text";
import Navigation from "@/components/atoms/Navigation";
import JournalForm from "@/components/Macro/JournalForm";

// TODO: Implement the Journal Summary page
// TODO: Add a button to edit the journal entry
// TODO: Add a section to display the journal entry's images
// TODO: Make the title of the page dynamic based on the journal entry's creation date
const Summary = () => {
  const { id } = useLocalSearchParams();
  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <Navigation title="Journal Summary" />
      <Stack.Screen options={{ title: "Summary" }} />
      <View flex={1} justifyContent={"center"} alignItems={"center"}>
        <JournalForm />
      </View>
    </View>
  );
};

export default Summary;
