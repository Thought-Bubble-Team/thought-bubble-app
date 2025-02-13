import { styled, View as TView, ViewProps as TViewProps } from "tamagui";

interface HeaderProps extends TViewProps {
  children?: React.ReactNode;
}

const ViewStyled = styled(TView, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: "$1",
    borderBottomColor: "#EAE2DE",
    width: "100%",
    gap: "$4",
    padding: "$4",
});

export default function Header(props: HeaderProps) {
  const { children, ...restProps } = props;
  return <ViewStyled {...restProps}> {children} </ViewStyled>;
}