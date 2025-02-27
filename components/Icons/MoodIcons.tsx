// @ts-ignore
import Emoji1 from "@/assets/icons/emojis/emoji-1.svg";
// @ts-ignore
import Emoji2 from "@/assets/icons/emojis/emoji-2.svg";
// @ts-ignore
import Emoji3 from "@/assets/icons/emojis/emoji-3.svg";
// @ts-ignore
import Emoji4 from "@/assets/icons/emojis/emoji-4.svg";

interface MoodIconsProps {
  mood: "happy" | "sad" | "angry" | "calm";
  size: number;
}

export default function MoodIcons(props: MoodIconsProps) {
  const { mood, size } = props;

  switch (mood) {
    case "happy":
      return <Emoji1 width={size} height={size} />;
    case "sad":
      return <Emoji2 width={size} height={size} />;
    case "angry":
      return <Emoji3 width={size} height={size} />;
    case "calm":
      return <Emoji4 width={size} height={size} />;
  }
}
