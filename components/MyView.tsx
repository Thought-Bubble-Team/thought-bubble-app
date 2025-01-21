import { View, ViewProps, styled } from "tamagui";

interface MyViewProps extends ViewProps {
  children?: React.ReactNode;
}

const ViewStyled = styled(View, {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  gap: "$3",
});

export default function MyView(props: MyViewProps) {
  const { children, ...restProps } = props;
  return <ViewStyled {...restProps}>{children}</ViewStyled>;
}
