import { useState, useEffect, useCallback } from "react";
import { Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styled, View, Input, Button, Spinner } from "tamagui";

import MyScrollView from "../Micro/MyScrollView";

import {
  createJournalEntry,
  getJournalEntry,
  JournalEntryType,
  updateJournalEntry,
} from "@/utils/supabase/db-crud";
import { PostgrestError } from "@supabase/supabase-js";
import { useFocusEffect } from "expo-router";

type FormMode = "create" | "update";

interface JournalEntryProps {
  journalEntry?: JournalEntryType;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JournalForm(props: JournalEntryProps) {
  const { journalEntry, setModalVisible } = props;
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[] | undefined>(undefined);
  const [mode, setMode] = useState<FormMode>("create");
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (mode === "update") {
          setMode("create");
          setTitle("");
          setMessage("");
          setImages(undefined);
          setError(null);
        }
      };
    }, [mode]),
  );

  useEffect(() => {
    const fetchJournalEntry = async (entry_id: number) => {
      const response = await getJournalEntry(entry_id);
      if (!response) {
        Alert.alert("Error", "Failed to fetch journal entry");
        return;
      }

      if (response.error) {
        Alert.alert("Error", response.error.message);
        return;
      }

      if (response.journalEntryData) {
        setTitle(response.journalEntryData[0].title); // Assuming it's an array
        setMessage(response.journalEntryData[0].content);
      }
    };

    if (journalEntry) {
      setMode("update");
      fetchJournalEntry(journalEntry.entry_id);
    }
  }, []);

  // Image Picker
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (images === undefined) {
        setImages([result.assets[0].uri]);
      } else {
        setImages([...images, result.assets[0].uri]);
      }
    }
  };
  const removeImage = (index: number) => {
    if (images !== undefined) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const journalEntryObject = {
      title: title,
      content: message,
    };

    try {
      const { error } =
        journalEntry === undefined
          ? await createJournalEntry(journalEntryObject)
          : await updateJournalEntry(journalEntry.entry_id, journalEntryObject);

      if (error) {
        Alert.alert("Error", error.message);
        setError(error);
      } else {
        Alert.alert(
          "Success",
          `Journal entry ${
            journalEntry === undefined ? "created" : "updated"
          } successfully!`,
        );
      }

      if (journalEntry === undefined) {
        setTitle("");
        setMessage("");
        setImages(undefined);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while submitting the journal entry",
      );
    } finally {
      setModalVisible && setModalVisible(false);
      setLoading(false);
    }
  };

  return (
    <ViewStyled>
      {/* Editable Title */}
      <View
        width={"100%"}
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <TitleInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title..."
        />
        <Button
          backgroundColor={"transparent"}
          onPress={() => setModalVisible && setModalVisible(false)}
        >
          <Ionicons name="close-outline" size={24} color="#443E3B" />
        </Button>
      </View>

      {/* Editable Message */}
      <MyScrollView backgroundColor={"$subtleBackground"}>
        <MessageInput
          multiline
          placeholder="Enter your message..."
          value={message}
          onChangeText={setMessage}
          backgroundColor={"$subtleBackground"}
        />
      </MyScrollView>

      {/* Images */}
      {images !== undefined && (
        <MyScrollView horizontal backgroundColor={"$subtleBackground"}>
          {images.map((image, index) => (
            <ImageWrapper key={index} style={{ zIndex: images.length - index }}>
              <ImageStyled source={{ uri: image }} />
              <RemoveImageWrapper>
                <RemoveButton onPress={() => removeImage(index)}>
                  <Ionicons
                    name="close-outline"
                    size={12}
                    color="#fff"
                    style={{ zIndex: 15 }}
                  />
                </RemoveButton>
              </RemoveImageWrapper>
            </ImageWrapper>
          ))}
        </MyScrollView>
      )}

      {/* Footer - Buttons */}
      <Footer>
        <ButtonStyled onPress={pickImageAsync}>
          <Ionicons name="images-outline" size={35} color="#443E3B" />
        </ButtonStyled>
        <ButtonStyled onPress={handleSubmit}>
          <Ionicons name="checkmark-done-outline" size={35} color="#443E3B" />
        </ButtonStyled>
      </Footer>
    </ViewStyled>
  );
}

const ViewStyled = styled(View, {
  width: "100%",
  backgroundColor: "$subtleBackground",
  borderBottomLeftRadius: "$4",
  borderBottomRightRadius: "$4",
  padding: "$5",
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
  borderColor: "$subtleBackground",
  backgroundColor: "$coloredBackground",
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
  backgroundColor: "$subtleBackground",
  color: "$textColor",
  paddingHorizontal: 0,
  paddingVertical: "$3",
});

const MessageInput = styled(Input, {
  fontFamily: "Montserrat_400Regular",
  fontSize: 16,
  textAlignVertical: "top",
  borderWidth: 0,
  borderColor: "$subtleTextColor",
  paddingHorizontal: 0,
  paddingVertical: "$3",
});

const Footer = styled(View, {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "$4",
});

const ButtonStyled = styled(Button, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$subtleBackground",
  borderWidth: 0,
});
