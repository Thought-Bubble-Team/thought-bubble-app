import { useState } from "react";
import { View, Switch } from "tamagui";
import { useLocalSearchParams, Stack } from "expo-router";

import { Button } from "@/components/atoms/Button";
import { Navigation } from "@/components/atoms/Navigation";
import JournalForm from "@/components/Macro/JournalForm";

// TODO: Implement the Journal Summary page
// TODO: Add a button to edit the journal entry
// TODO: Add a section to display the journal entry's images
// TODO: Make the title of the page dynamic based on the journal entry's creation date
const Summary = () => {
  const { id } = useLocalSearchParams();
  const [editable, setEditable] = useState<boolean>(false);
  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <Navigation title="Journal Summary">
        <Navigation.Right>
          <Button
            type="icon"
            size="$md"
            padding={0}
            onPress={() => setEditable(!editable)}
          >
            <Button.Text color="$black">Edit</Button.Text>
            <Switch
              native="android"
              defaultChecked={editable}
              onCheckedChange={() => setEditable(!editable)}
            />
          </Button>
        </Navigation.Right>
      </Navigation>
      <Stack.Screen options={{ title: "Summary" }} />
      <View flex={1} justifyContent={"center"} alignItems={"center"}>
        <JournalForm editable={editable} />
      </View>
    </View>
  );
};

export default Summary;
