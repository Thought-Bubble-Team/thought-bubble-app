import { useState, useMemo, SetStateAction, Dispatch } from "react";
import { Select, SelectProps, Adapt, Sheet, YStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

interface MySelectProps extends SelectProps {
  val: string;
  setVal: Dispatch<SetStateAction<string>>;
  months: { id: number; month: string; year: number }[];
  borderWidth?: number;
  color?: string;
}

export default function MySelect({
  val,
  setVal,
  months,
  borderWidth,
  color,
  ...restProps
}: MySelectProps) {
  return (
    <Select value={val} onValueChange={setVal} disablePreventBodyScroll>
      <Select.Trigger width={125} borderWidth={borderWidth}>
        <Select.Value placeholder="Jan 2025" color={color} size={16} />
        <Ionicons name="chevron-down-sharp" size={16} color={color} />
      </Select.Trigger>

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
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Ionicons name="chevron-down-sharp" size={16} />
          </YStack>
        </Select.ScrollUpButton>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>Select Date</Select.Label>
            {useMemo(
              () =>
                months.map((item, index) => (
                  <Select.Item
                    index={index}
                    key={item.id}
                    value={item.month.toLowerCase() + " " + item.year}
                  >
                    <Select.ItemText>
                      {item.month} {item.year}
                    </Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Ionicons name="checkmark-sharp" size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                )),
              [months],
            )}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Ionicons name="chevron-down-sharp" size={16} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
