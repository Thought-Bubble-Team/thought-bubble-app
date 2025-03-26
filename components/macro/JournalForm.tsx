// LIBRARIES
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { StyleSheet, Image, Alert, KeyboardAvoidingView } from "react-native";
// import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styled, View, Input, YStack, useTheme, TextArea } from "tamagui";
import { PostgrestError } from "@supabase/supabase-js";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";

// COMPONENTS
// import ScrollView from "@/components/atoms/ScrollView";
import { Button } from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";

// UTILITIES
import { JournalFormProps } from "@/utils/interfaces/componentPropTypes";
import {
  createGratitudeEntry,
  createJournalEntry,
  createJournalAnalysis,
  getGratitudeEntry,
  // getJournalEntry,
  updateGratitudeEntry,
  updateJournalEntry,
} from "@/utils/supabase/db-crud";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import Modal from "../atoms/Modal";
import LoadingScreen from "./LoadingScreen";
import { useJournalEntriesStore } from "@/utils/stores/useEntriesStore";

export const Basic = ({
  content,
  setMessage,
  editable,
}: {
  content: string | undefined;
  setMessage: Dispatch<SetStateAction<string | undefined>>;
  editable: boolean;
}) => {
  const theme = useTheme();
  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    onChange: () => {
      editor.getText().then((text) => setMessage(text));
    },
    initialContent: content,
    editable: true,
    theme: {
      toolbar: {
        toolbarBody: {
          borderTopColor: "#C6C6C6B3",
          borderBottomColor: "#C6C6C6B3",
          backgroundColor: "#474747",
        },
      },
      webview: {
        backgroundColor: theme.grey0.get(),
      },
      webviewContainer: {},
    },
  });

  return (
    <View flex={1}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior="height"
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default function JournalForm({ editable = true }: JournalFormProps) {
  const sessionStore = useSessionStore();
  const { journal_entries } = useJournalEntriesStore();
  const theme = useTheme();

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [images, setImages] = useState<string[] | undefined>(undefined);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);

  const { id, type } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      const fetchJournalEntry = async (entry_id: number) => {
        if (!journal_entries) {
          return;
        }

        const journal_entry = journal_entries.find(
          (entry) => entry.entry_id === Number(id)
        );

        if (!journal_entry) {
          return;
        }

        setContent(journal_entry.content);
        setMessage(journal_entry.content);
        setTitle(journal_entry.title);
      };

      const fetchGratitudeEntry = async (entry_id: number) => {
        const response = await getGratitudeEntry(entry_id);
        if (!response) {
          Alert.alert("Error", "Failed to fetch gratitude entry");
          return;
        }

        if (response.error) {
          Alert.alert("Error", response.error.message);
          return;
        }

        if (response.gratitudeEntryData) {
          setTitle(response.gratitudeEntryData[0].title); // Assuming it's an array
          setMessage(response.gratitudeEntryData[0].content);
        }
      };

      if (type === "editJournal") {
        void fetchJournalEntry(Number(id));
      }

      if (type === "editGratitude") {
        void fetchGratitudeEntry(Number(id));
      }

      if (type === "gratitude") {
        setTitle("Today I'm grateful for...");
        setMessage("");
        setImages(undefined);
      }
    }, [])
  );

  // Image Picker
  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ["images"],
  //     allowsEditing: true,
  //     quality: 1,
  //   });
  //
  //   if (!result.canceled) {
  //     if (images === undefined) {
  //       setImages([result.assets[0].uri]);
  //     } else {
  //       setImages([...images, result.assets[0].uri]);
  //     }
  //   }
  // };

  // const removeImage = (index: number) => {
  //   if (images !== undefined) {
  //     setImages(images.filter((_, i) => i !== index));
  //   }
  // };

  const handleSubmit = async () => {
    setLoading(true);
    const journalEntryObject = {
      title: title,
      content: message,
    };

    // Check if title and message are filled out
    if (title === undefined || message === undefined) {
      Alert.alert("Error", "Please fill out all fields");
      setLoading(false);
      return;
    }

    // Check if user is logged in
    if (!sessionStore.session) {
      Alert.alert("Error", "User not found");
      setLoading(false);
      return;
    }

    try {
      if (type === "gratitude") {
        setLoading(true);
        const { error } = await createGratitudeEntry(journalEntryObject);

        if (error) {
          Alert.alert("Error", error.message);
          setError(error);
        } else {
          Alert.alert("Success", "Gratitude entry created successfully!");
          router.replace({ pathname: "/gratitude" });
        }
        setLoading(false);
      } // Do nothing

      if (type === "journal") {
        try {
          console.info("Creating journal entry...");

          const result = await createJournalEntry(
            journalEntryObject,
            sessionStore.session.user.id
          );

          if (
            result &&
            result.data !== null &&
            result.data.entry_id !== undefined
          ) {
            console.info("Creating journal analysis...");
            console.info("Analyzing entry_id: ", result.data.entry_id);
            await createJournalAnalysis(result.data.entry_id);
            setLoading(false);
            Alert.alert("Success", "Journal entry created successfully!");
            router.replace({ pathname: "/journals" });
          }
        } catch (error) {
          setLoading(false);
          Alert.alert(
            "Error",
            "An error occurred while submitting the journal entry"
          );
          console.error(error);
        }
      }

      if (type === "editJournal") {
        console.log(journalEntryObject.content);
        console.log(journalEntryObject.title);
        const result = await updateJournalEntry(
          Number(id),
          journalEntryObject,
          sessionStore.session.user.id
        );

        if (result.data) {
          Alert.alert("Success", "Journal entry updated successfully!");
          router.replace({ pathname: "/journals" });
        }
        // if (error) {
        //   Alert.alert("Error", error.message);
        //   setError(error);
        // } else {
        //   Alert.alert("Success", "Journal entry updated successfully!");
        //   router.replace({ pathname: "/journals" });
        // }
        setLoading(false);
      }

      if (type === "editGratitude") {
        const { error } = await updateGratitudeEntry(
          Number(id),
          journalEntryObject
        );

        if (error) {
          Alert.alert("Error", error.message);
          setError(error);
        } else {
          Alert.alert("Success", "Gratitude entry updated successfully!");
          router.replace({ pathname: "/gratitude" });
        }
        setLoading(false);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while submitting the journal entry"
      );
    }
  };

  return (
    <ViewStyled>
      <Modal modalVisible={loading}>
        <LoadingScreen>
          <Text weight="bold">Submitting Entry</Text>
        </LoadingScreen>
      </Modal>
      {/* Footer - Buttons */}
      {editable && (
        <Footer justifyContent="flex-end">
          {/* <Button type="icon" padding={0} onPress={pickImageAsync}>
            <Button.Icon>
              <Ionicons name="images-outline" />
            </Button.Icon>
          </Button> */}
          <Button type="icon" padding={0} size={"$sm"} onPress={handleSubmit}>
            {!loading && (
              <Button.Icon>
                <Ionicons name="checkmark-done-outline" />
              </Button.Icon>
            )}
            {loading && <Button.Spinner color={"$black"} />}
          </Button>
        </Footer>
      )}

      {/* Images */}
      {/* {images !== undefined && images.length > 0 && (
        <ScrollView horizontal backgroundColor={"$grey0"} maxHeight={100}>
          {images.map((image, index) => (
            <ImageWrapper key={index} style={{ zIndex: images.length - index }}>
              <ImageStyled source={{ uri: image }} />
              {editable && (
                <RemoveImageWrapper>
                  <RemoveButton onPress={() => removeImage(index)}>
                    <Ionicons
                      name="close-outline"
                      size={12}
                      color={theme.white.get()}
                      style={{ zIndex: 15 }}
                    />
                  </RemoveButton>
                </RemoveImageWrapper>
              )}
            </ImageWrapper>
          ))}
        </ScrollView>
      )} */}

      {/* Editable Title */}
      <View
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <TitleInput
          editable={editable}
          value={title}
          width={"100%"}
          onChangeText={setTitle}
          placeholder="Enter title..."
          placeholderTextColor={theme.grey5.get()}
        />
      </View>

      {/* Editable Message */}
      <MessageInput
        editable={editable}
        placeholder="Enter your message..."
        placeholderTextColor={theme.grey5.get()}
        value={message}
        onChangeText={setMessage}
        backgroundColor={"$grey0"}
        color="$black"
      />
      {/* <MarkdownTextInput
          value={message}
          onChangeText={setMessage}
          style={styles.MessageInput}
          placeholder="Enter your message..."
          parser={parseExpensiMark}
          editable={editable}
        /> */}
      {/* <Basic content={content} setMessage={setMessage} editable={editable} /> */}
    </ViewStyled>
  );
}

const ViewStyled = styled(YStack, {
  width: "100%",
  height: "100%",
  backgroundColor: "$grey0",
  borderBottomLeftRadius: "$4",
  borderBottomRightRadius: "$4",
  justifyContent: "flex-start",
  padding: "$3",
});

const ImageWrapper = styled(View, {
  position: "relative",
  marginTop: 10,
});

const RemoveImageWrapper = styled(View, {
  position: "absolute",
  top: -8,
  right: -4,
  width: 24,
  height: 24,
  borderRadius: 32,
  borderWidth: 2,
  borderColor: "$grey0",
  backgroundColor: "$grey3",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
});

const RemoveButton = styled(Button, {
  backgroundColor: "transparent",
  padding: 0,
  minWidth: 0,
  minHeight: 0,
});

const ImageStyled = styled(Image, {
  width: 80,
  height: 80,
  borderRadius: 10,
  marginRight: 8,
});

const TitleInput = styled(Input, {
  fontFamily: "Montserrat_700Bold",
  fontSize: 15,
  borderWidth: 0,
  backgroundColor: "$grey0",
  color: "$black",
  paddingHorizontal: 0,
  paddingVertical: "$3",
});

const MessageInput = styled(TextArea, {
  fontFamily: "Montserrat_400Regular",
  fontSize: 16,
  textAlignVertical: "top",
  borderWidth: 0,
  borderColor: "$grey0",
  paddingHorizontal: 0,
  paddingVertical: "$3",
  numberOfLines: 50,
  maxLength: 3000,
  flex: 1,
});

const styles = StyleSheet.create({
  MessageInput: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
    textAlignVertical: "top",
    borderWidth: 0,
    borderColor: "$grey0",
    paddingHorizontal: 0,
    paddingVertical: 12,
    flex: 1,
  },
});

const Footer = styled(View, {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "$4",
});
