import {
  useTheme,
  createStyledContext,
  withStaticProperties,
  TamaguiElement,
  getTokens,
} from "tamagui";
import { styled, View, Spinner } from "tamagui";
import Text from "@/components/atoms/Text";
import React, { forwardRef } from "react";

export const ButtonContext = createStyledContext({
  type: "normal",
  size: "$sm",
});

export const ButtonFrame = styled(
  forwardRef<TamaguiElement, React.ComponentProps<typeof View>>(
    (props, ref) => <View ref={ref} {...props} />
  ),
  {
    context: ButtonContext,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevationAndroid: 2,

    variants: {
      type: {
        normal: {
          backgroundColor: "$primary",
          pressStyle: {
            opacity: 0.8,
          },
          borderRadius: "$10",
          padding: "$lg",
          width: "100%",
        },
        navigation: {
          justifyContent: "space-between",
          backgroundColor: "$grey1",
          pressStyle: {
            backgroundColor: "$grey2",
          },
          borderRadius: 20,
          paddingVertical: "$xl",
          paddingHorizontal: "$xxl",
          width: "100%",
        },
        icon: {
          backgroundColor: "$transparent",
          pressStyle: {
            opacity: 0.57,
          },
        },
      },
      size: {
        "...size": (name, { tokens }) => {
          return {
            padding: tokens.size[name],
          };
        },
      },
    } as const,
  }
);

export const ButtonText = styled(Text, {
  context: ButtonContext,
  userSelect: "none",

  variants: {
    type: {
      normal: {
        color: "$white",
        weight: "bold",
      },
      navigation: {
        color: "$black",
        weight: "medium",
      },
      icon: {
        color: "$primary",
        weight: "bold",
      },
    },
    size: {
      "...size": (name, { tokens }) => {
        return {
          fontSize: tokens.size[name],
        };
      },
    },
  } as const,
});

const ButtonIcon = (props: { children: React.ReactNode }) => {
  const { type, size } = React.useContext(ButtonContext);
  const theme = useTheme();
  const tokens = getTokens();

  let colorToken = theme.black.get();
  let sizeToken = tokens.size[size].val * 3;
  if (type === "normal") {
    colorToken = theme.white.get();
  } else if (type === "navigation") {
    colorToken = theme.black.get();
  }

  return !React.isValidElement(props.children)
    ? null
    : React.cloneElement(props.children, {
        ...props.children.props,
        color: colorToken,
        size: sizeToken,
      });
};

const ButtonSpinner = styled(Spinner, {
  context: ButtonContext,

  variants: {
    type: {
      normal: {
        color: "$white",
        width: "$lg",
        height: "$lg",
      },
      navigation: {
        color: "$black",
        width: "$xxl",
        height: "$xxl",
      },
      icon: {
        color: "$primary",
      },
    },
    size: {
      "...size": (name, { tokens }) => {
        return {
          fontSize: tokens.size[name],
        };
      },
    },
  } as const,
});

export const Button = withStaticProperties(ButtonFrame, {
  Text: ButtonText,
  Icon: ButtonIcon,
  Spinner: ButtonSpinner,
  Props: ButtonContext.Provider,
});
