// LIBRARIES
import { useState, useEffect, useCallback } from "react";
import { Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styled, View, Input, TextArea, YStack, useTheme } from "tamagui";
import { PostgrestError } from "@supabase/supabase-js";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

// COMPONENTS
import MyScrollView from "@/components/atoms/MyScrollView";
import { Button } from "@/components/atoms/Button";

// UTILITIES
import { JournalFormProps } from "@/utils/interfaces/componentPropTypes";
import {
  createGratitudeEntry,
  createJournalEntry,
  getGratitudeEntry,
  getJournalEntry,
  updateGratitudeEntry,
  updateJournalEntry,
} from "@/utils/supabase/db-crud";

// TODO: Make image pressable to view full screen
// REF: update handleSubmit to handle errors properly

export default function JournalForm({ editable = true }: JournalFormProps) {
  const theme = useTheme();

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [images, setImages] = useState<string[] | undefined>(undefined);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);

  const { id, type } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
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
    }, []),
  );

  // useEffect(() => {
  //   const fetchJournalEntry = async (entry_id: number) => {
  //     const response = await getJournalEntry(entry_id);
  //     if (!response) {
  //       Alert.alert("Error", "Failed to fetch journal entry");
  //       return;
  //     }
  //
  //     if (response.error) {
  //       Alert.alert("Error", response.error.message);
  //       return;
  //     }
  //
  //     if (response.journalEntryData) {
  //       setTitle(response.journalEntryData[0].title); // Assuming it's an array
  //       setMessage(response.journalEntryData[0].content);
  //     }
  //   };
  //
  //   const fetchGratitudeEntry = async (entry_id: number) => {
  //     const response = await getGratitudeEntry(entry_id);
  //     if (!response) {
  //       Alert.alert("Error", "Failed to fetch gratitude entry");
  //       return;
  //     }
  //
  //     if (response.error) {
  //       Alert.alert("Error", response.error.message);
  //       return;
  //     }
  //
  //     if (response.gratitudeEntryData) {
  //       setTitle(response.gratitudeEntryData[0].title); // Assuming it's an array
  //       setMessage(response.gratitudeEntryData[0].content);
  //     }
  //   };
  //
  //   if (type === "editJournal") {
  //     void fetchJournalEntry(Number(id));
  //   }
  //
  //   if (type === "editGratitude") {
  //     void fetchGratitudeEntry(Number(id));
  //   }
  //
  //   if (type === "gratitude") {
  //     setTitle("Today I'm grateful for...");
  //     setMessage("");
  //     setImages(undefined);
  //   }
  // }, []);

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
      if (
        journalEntryObject.title === undefined ||
        journalEntryObject.content === undefined
      ) {
        Alert.alert("Error", "Title and message cannot be empty");
        setLoading(false);
        return;
      }

      if (type === "gratitude") {
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
        const { error } = await createJournalEntry(journalEntryObject);

        if (error) {
          Alert.alert("Error", error.message);
          setError(error);
        } else {
          Alert.alert("Success", "Journal entry created successfully!");
          router.replace({ pathname: "/journals" });
        }
        setLoading(false);
      }

      if (type === "editJournal") {
        const { error } = await updateJournalEntry(
          Number(id),
          journalEntryObject,
        );

        if (error) {
          Alert.alert("Error", error.message);
          setError(error);
        } else {
          Alert.alert("Success", "Journal entry updated successfully!");
          router.replace({ pathname: "/journals" });
        }
        setLoading(false);
      }

      if (type === "editGratitude") {
        const { error } = await updateGratitudeEntry(
          Number(id),
          journalEntryObject,
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
        "An error occurred while submitting the journal entry",
      );
    }
  };

  return (
    <ViewStyled>
      {/* Footer - Buttons */}
      {editable && (
        <Footer>
          <Button type="icon" padding={0} onPress={pickImageAsync}>
            <Button.Icon>
              <Ionicons name="images-outline" />
            </Button.Icon>
          </Button>
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
      {images !== undefined && (
        <MyScrollView horizontal backgroundColor={"$grey0"} maxHeight={100}>
          {images.map((image, index) => (
            <ImageWrapper key={index} style={{ zIndex: images.length - index }}>
              <ImageStyled source={{ uri: image }} />
              {editable && (
                <RemoveImageWrapper>
                  <RemoveButton onPress={() => removeImage(index)}>
                    <Ionicons
                      name="close-outline"
                      size={12}
                      color={theme.white?.val}
                      style={{ zIndex: 15 }}
                    />
                  </RemoveButton>
                </RemoveImageWrapper>
              )}
            </ImageWrapper>
          ))}
        </MyScrollView>
      )}

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
        />
      </View>

      {/* Editable Message */}
      <View backgroundColor={"$grey0"} flex={1}>
        <MessageInput
          editable={editable}
          placeholder="Enter your message..."
          value={message}
          onChangeText={setMessage}
          backgroundColor={"$grey0"}
        />
      </View>
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
  backgroundColor: "$grey2",
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

const Footer = styled(View, {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "$4",
});
