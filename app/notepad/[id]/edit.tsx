import { useCallback, useState } from "react";
import { View, Switch } from "tamagui";
import { useFocusEffect } from "expo-router";

import { Button } from "@/components/atoms/Button";
import { Navigation } from "@/components/macro/Navigation";
import JournalForm from "@/components/macro/JournalForm";

const Edit = () => {
  const [editable, setEditable] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setEditable(false);
    }, [])
  );

  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      marginTop="$3"
    >
      <Navigation>
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
              defaultChecked={false}
              onCheckedChange={() => setEditable(!editable)}
            />
          </Button>
        </Navigation.Right>
      </Navigation>
      <View
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        padding="$3"
      >
        <JournalForm editable={editable} />
      </View>
    </View>
  );
};

export default Edit;
