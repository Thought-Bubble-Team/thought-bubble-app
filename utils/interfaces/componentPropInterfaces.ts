import { TextInputProps as RNTextInputProps } from "react-native";
import { CardProps } from "tamagui";

import { JournalEntryType } from "@/utils/interfaces/dataTypes";

export interface JournalCardProps extends CardProps {
  journalEntry: JournalEntryType;
  children?: React.ReactNode;
  showSentimentData?: boolean;
  emotion?: string | null;
}

export interface InputProps extends RNTextInputProps {
  label: string;
  type?: "email" | "password";
  showInput?: boolean;
  setShowInput?: React.Dispatch<React.SetStateAction<boolean>>;
}
