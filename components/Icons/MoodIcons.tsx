interface MoodIconsProps {
  mood: "happy" | "sad" | "angry" | "calm";
  size: number;
}

export default function MoodIcons(props: MoodIconsProps) {
  const { mood, size } = props;
}
