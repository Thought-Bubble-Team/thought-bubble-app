import { ScrollView, ScrollViewProps, YStack, styled } from "tamagui";
import { PropsWithChildren } from "react";

interface MyViewProps extends ScrollViewProps {
  children?: React.ReactNode;
}

const YStackStyled = styled(YStack, {
  gap: "$2",
  alignItems: "center",
  justifyContent: "center",
});

export default function MyScrollView(props: MyViewProps) {
  const { children, ...restProps } = props;
  return (
    <ScrollView showsVerticalScrollIndicator={false} {...restProps}>
      {children}
    </ScrollView>
  );
}
