import { useMemo, SetStateAction, Dispatch } from "react";
import {
  Select as TSelect,
  SelectProps as TSelectProps,
  Adapt,
  Sheet,
  YStack,
} from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "tamagui";

interface SelectProps extends TSelectProps {
  val: string;
  setVal: (newDate: string) => void;
  date: { id: number; date: string }[];
  borderWidth?: number;
  color?: string;
  opacity?: number;
  placeholder?: string;
}

export default function Select({
  val,
  setVal,
  date,
  borderWidth,
  color,
  opacity,
  placeholder = "Jan 2025",
  ...restProps
}: SelectProps) {
  const theme = useTheme();
  return (
    <TSelect value={val} onValueChange={setVal} disablePreventBodyScroll>
      <TSelect.Trigger width={125} borderWidth={borderWidth}>
        <TSelect.Value
          placeholder={placeholder}
          color={color}
          size={16}
          opacity={opacity}
        />
        <Ionicons
          name="chevron-down-sharp"
          size={16}
          color={theme.black.get()}
          style={{ opacity: opacity }}
        />
      </TSelect.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!restProps.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="medium"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <TSelect.Content zIndex={200000}>
        <TSelect.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Ionicons name="chevron-down-sharp" size={16} />
          </YStack>
        </TSelect.ScrollUpButton>
        <TSelect.Viewport minWidth={200}>
          <TSelect.Group>
            <TSelect.Label color="$black">Select Date</TSelect.Label>
            {useMemo(
              () =>
                date.map((item, index) => (
                  <TSelect.Item index={index} key={item.id} value={item.date}>
                    <TSelect.ItemText color="$black">
                      {item.date}
                    </TSelect.ItemText>
                    <TSelect.ItemIndicator marginLeft="auto">
                      <Ionicons name="checkmark-sharp" size={16} />
                    </TSelect.ItemIndicator>
                  </TSelect.Item>
                )),
              [date]
            )}
          </TSelect.Group>
        </TSelect.Viewport>
        <TSelect.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Ionicons name="chevron-down-sharp" size={16} />
          </YStack>
        </TSelect.ScrollDownButton>
      </TSelect.Content>
    </TSelect>
  );
}
