import { useState, useEffect } from "react";
import { Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styled, View, Input, useWindowDimensions, Button } from "tamagui";

import MyScrollView from "./MyScrollView";

export default function JournalEntry() {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[] | undefined>(undefined);

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

  {
    /* Temporary function to test the right button */
  }
  const handleRightPress = () => setTitle("Hello Testing");

  return (
    <ViewStyled>
      {/* Editable Title */}
      <View width={"100%"} justifyContent="flex-start">
        <TitleInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title..."
        />
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
              <RemoveImageButton onPress={() => removeImage(index)}>
                <Ionicons
                  name="close-outline"
                  size={12}
                  color="#fff"
                  style={{ zIndex: 15 }}
                />
              </RemoveImageButton>
            </ImageWrapper>
          ))}
        </MyScrollView>
      )}

      {/* Footer - Buttons */}
      <Footer>
        <ButtonStyled onPress={pickImageAsync}>
          <Ionicons name="images-outline" size={35} color="#443E3B" />
        </ButtonStyled>
        <ButtonStyled onPress={handleRightPress}>
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

const RemoveImageButton = styled(Button, {
  position: "absolute",
  top: -8,
  right: -8,
  width: 24,
  height: 24,
  borderRadius: 32,
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
  zIndex: 10,
  backgroundColor: "$coloredBackground",
  borderWidth: "$1",
  borderColor: "#fff",
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
