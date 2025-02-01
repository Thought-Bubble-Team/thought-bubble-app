import React, { useState } from "react";
import {
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
} from "react-native";
import { styled, View, Input } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

import MyScrollView from "./MyScrollView";

const NotebookCard = () => {
  const { width, height } = Dimensions.get("window");

  const paddingValue = width * 0.05; // 5% padding
  const gapValue = width * 0.06; // 6% gap

  // 🔹 State for title, message, and images
  const [title, setTitle] = useState("My Notebook");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([
    "https://placecats.com/200/200",
    "https://placecats.com/201/200",
  ]);

  // 🔹 Button handlers
  const handleLeftPress = () => Alert.alert("Left Button Pressed");
  const handleRightPress = () => Alert.alert("Right Button Pressed");

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

      {/* Image Section (if images exist) */}
      {images.length > 0 && (
        <ScrollView horizontal style={styles.imageContainer}>
          {images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.image} />
          ))}
        </ScrollView>
      )}

      {/* Footer - Buttons */}
      <Footer>
        <Button onPress={handleLeftPress}>
          <Ionicons name="images-outline" size={35} color="#443E3B" />
        </Button>
        <Button onPress={handleRightPress}>
          <Ionicons name="checkmark-done-outline" size={35} color="#443E3B" />
        </Button>
      </Footer>
    </ViewStyled>
  );
};

const ViewStyled = styled(View, {
  width: "100%",
  backgroundColor: "$subtleBackground",
  borderBottomLeftRadius: "$4",
  borderBottomRightRadius: "$4",
  padding: "$5",
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

const Button = styled(TouchableOpacity, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 50,
  backgroundColor: "$subtleBackground",
  borderWidth: 0,
});

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  titleInput: {
    fontSize: 15,
    fontWeight: "bold",
  },
  messageContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  messageInput: {
    fontSize: 16,
    textAlignVertical: "top",
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default NotebookCard;
