import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
} from "react-native";

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
    <View style={[styles.container, { padding: paddingValue, gap: gapValue }]}>
      {/* Editable Title */}
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title..."
      />

      {/* Scrollable Message Section (40% height) */}
      <ScrollView style={[styles.messageContainer, { height: height * 0.4 }]}>
        <TextInput
          style={styles.messageInput}
          multiline
          placeholder="Enter your message..."
          value={message}
          onChangeText={setMessage}
        />
      </ScrollView>

      {/* Image Section (if images exist) */}
      {images.length > 0 && (
        <ScrollView horizontal style={styles.imageContainer}>
          {images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.image} />
          ))}
        </ScrollView>
      )}

      {/* Footer - Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleLeftPress}>
          <Text style={styles.buttonText}>Left Button</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRightPress}>
          <Text style={styles.buttonText}>Right Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
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
