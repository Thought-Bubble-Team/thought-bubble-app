import { View, XStack, styled } from "tamagui";

import MoodIcons from "@/components/Icons/MoodIcons";
import Text from "@/components/atoms/Text";

const EmotionDetailsCard = ({
  emotion,
  value,
  color,
}: {
  emotion: string;
  value: string;
  color: string;
}) => {
  return (
    <CardContainer shadowColor={color} borderBottomColor={color}>
      <LeftSection>
        <IconContainer>
          <MoodIcons mood={emotion} size={42} />
        </IconContainer>
        <LabelContainer>
          <EmotionText>{emotion}</EmotionText>
        </LabelContainer>
      </LeftSection>
      <ValueContainer>
        <ValueText>{value}</ValueText>
      </ValueContainer>
    </CardContainer>
  );
};

// Styled components
const CardContainer = styled(XStack, {
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: "$2",
  backgroundColor: "$grey3",
  width: "100%",
  padding: "$lg",
  elevation: 5,
  borderBottomWidth: 5,
  borderRadius: 12,
});

const LeftSection = styled(XStack, {
  alignItems: "center",
  gap: "$lg",
});

const IconContainer = styled(View, {
  // Empty for future styling if needed
});

const LabelContainer = styled(View, {
  // Empty for future styling if needed
});

const EmotionText = styled(Text, {
  weight: "bold",
  fontSize: "$lg",
  color: "$black",
});

const ValueContainer = styled(View, {
  // Empty for future styling if needed
});

const ValueText = styled(Text, {
  weight: "bold",
  fontSize: "$lg",
  color: "$grey5",
});

export default EmotionDetailsCard;
