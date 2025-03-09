import { EmotionSummaryType } from "@/utils/interfaces/dataTypes";
import Logger from "../log";

const emotionColors = [
  { emotion: "joy", color: "#FFD166" },
  { emotion: "fear", color: "#443E3B" },
  { emotion: "love", color: "#CB806A" },
  { emotion: "anger", color: "#F44336" },
  { emotion: "grief", color: "#90766F" },
  { emotion: "pride", color: "#33A1FF" },
  { emotion: "caring", color: "#F6EFEC" },
  { emotion: "desire", color: "#D96C4F" },
  { emotion: "relief", color: "#4CAF50" },
  { emotion: "disgust", color: "#8E6F5E" },
  { emotion: "neutral", color: "#E9D9D0" },
  { emotion: "remorse", color: "#BCA49D" },
  { emotion: "sadness", color: "#6F5D56" },
  { emotion: "approval", color: "#66BB6A" },
  { emotion: "optimism", color: "#FFC107" },
  { emotion: "surprise", color: "#D8C6BD" },
  { emotion: "amusement", color: "#FFB74D" },
  { emotion: "annoyance", color: "#BBADA6" },
  { emotion: "confusion", color: "#A0887D" },
  { emotion: "curiosity", color: "#448AFF" },
  { emotion: "gratitude", color: "#C69C85" },
  { emotion: "admiration", color: "#8AB6E3" },
  { emotion: "excitement", color: "#E76F51" },
  { emotion: "disapproval", color: "#A05244" },
  { emotion: "nervousness", color: "#BCA49D" },
  { emotion: "realization", color: "#D3B8A4" },
  { emotion: "embarrassment", color: "#E29D89" },
  { emotion: "disappointment", color: "#90766F" },
];

export const processEmotionSummary = (emotion_summary: EmotionSummaryType) => {
  const { emotion_values } = emotion_summary;
  const processed_emotion_summary = emotion_values.map((item) => {
    try {
      const emotion_color = emotionColors.find(
        (obj) => obj.emotion === item.emotion,
      );
      return {
        emotion: item.emotion,
        value: item.value,
        color: emotion_color?.color,
      };
    } catch (error) {
      Logger.error("Cannot find emotion color");
    }
  });

  return processed_emotion_summary;
};
