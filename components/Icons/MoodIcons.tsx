import Emoji1 from "@/assets/icons/emojis/emoji-1.svg";
import Emoji2 from "@/assets/icons/emojis/emoji-2.svg";
import Emoji3 from "@/assets/icons/emojis/emoji-3.svg";
import Emoji4 from "@/assets/icons/emojis/emoji-4.svg";

// New Emojis
import AdmirationEmoji from "@/assets/icons/emojis/admiration.svg";
import AmusementEmoji from "@/assets/icons/emojis/amusement.svg";
import AngerEmoji from "@/assets/icons/emojis/anger.svg";
import AnnoyanceEmoji from "@/assets/icons/emojis/annoyance.svg";
import ApprovalEmoji from "@/assets/icons/emojis/approval.svg";
import CaringEmoji from "@/assets/icons/emojis/caring.svg";
import ConfusionEmoji from "@/assets/icons/emojis/confusion.svg";
import CuriosityEmoji from "@/assets/icons/emojis/curiosity.svg";
import DesireEmoji from "@/assets/icons/emojis/desire.svg";
import DisappointmentEmoji from "@/assets/icons/emojis/disappointment.svg";
import DisapprovalEmoji from "@/assets/icons/emojis/disapproval.svg";
import DisgustEmoji from "@/assets/icons/emojis/disgust.svg";
import EmbarrassmentEmoji from "@/assets/icons/emojis/embarrassment.svg";
import ExcitementEmoji from "@/assets/icons/emojis/excitement.svg";
import FearEmoji from "@/assets/icons/emojis/fear.svg";
import GratitudeEmoji from "@/assets/icons/emojis/gratitude.svg";
import GriefEmoji from "@/assets/icons/emojis/grief.svg";
import JoyEmoji from "@/assets/icons/emojis/joy.svg";
import LoveEmoji from "@/assets/icons/emojis/love.svg";
import NervousnessEmoji from "@/assets/icons/emojis/nervousness.svg";
import NeutralEmoji from "@/assets/icons/emojis/neutral.svg";
import OptimismEmoji from "@/assets/icons/emojis/optimism.svg";
import PrideEmoji from "@/assets/icons/emojis/pride.svg";
import RealizationEmoji from "@/assets/icons/emojis/realization.svg";
import ReliefEmoji from "@/assets/icons/emojis/relief.svg";
import RemorseEmoji from "@/assets/icons/emojis/remorse.svg";
import SadnessEmoji from "@/assets/icons/emojis/sadness.svg";
import SurpriseEmoji from "@/assets/icons/emojis/surprise.svg";

interface MoodIconsProps {
  mood: string;
  size: number;
}

export default function MoodIcons(props: MoodIconsProps) {
  const { mood, size } = props;

  switch (mood) {
    case "admiration":
      return <AdmirationEmoji width={size} height={size} />;
    case "amusement":
      return <AmusementEmoji width={size} height={size} />;
    case "anger":
      return <AngerEmoji width={size} height={size} />;
    case "annoyance":
      return <AnnoyanceEmoji width={size} height={size} />;
    case "approval":
      return <ApprovalEmoji width={size} height={size} />;
    case "caring":
      return <CaringEmoji width={size} height={size} />;
    case "confusion":
      return <ConfusionEmoji width={size} height={size} />;
    case "curiosity":
      return <CuriosityEmoji width={size} height={size} />;
    case "desire":
      return <DesireEmoji width={size} height={size} />;
    case "disappointment":
      return <DisappointmentEmoji width={size} height={size} />;
    case "disapproval":
      return <DisapprovalEmoji width={size} height={size} />;
    case "disgust":
      return <DisgustEmoji width={size} height={size} />;
    case "embarrassment":
      return <EmbarrassmentEmoji width={size} height={size} />;
    case "excitement":
      return <ExcitementEmoji width={size} height={size} />;
    case "fear":
      return <FearEmoji width={size} height={size} />;
    case "gratitude":
      return <GratitudeEmoji width={size} height={size} />;
    case "grief":
      return <GriefEmoji width={size} height={size} />;
    case "joy":
      return <JoyEmoji width={size} height={size} />;
    case "love":
      return <LoveEmoji width={size} height={size} />;
    case "nervousness":
      return <NervousnessEmoji width={size} height={size} />;
    case "neutral":
      return <NeutralEmoji width={size} height={size} />;
    case "optimism":
      return <OptimismEmoji width={size} height={size} />;
    case "pride":
      return <PrideEmoji width={size} height={size} />;
    case "realization":
      return <RealizationEmoji width={size} height={size} />;
    case "relief":
      return <ReliefEmoji width={size} height={size} />;
    case "remorse":
      return <RemorseEmoji width={size} height={size} />;
    case "sadness":
      return <SadnessEmoji width={size} height={size} />;
    case "surprise":
      return <SurpriseEmoji width={size} height={size} />;
    default:
      return null;
  }
}
