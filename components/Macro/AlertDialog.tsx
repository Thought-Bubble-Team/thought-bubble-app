import {
  Spinner,
  AlertDialog as TAlertDialog,
  AlertDialogProps as TAlertDialogProps,
  XStack,
  YStack,
} from "tamagui";
import { TouchableOpacity } from "react-native";

import { Button } from "@/components/Micro/Button";

interface AlertDialogProps extends TAlertDialogProps {
  title: string;
  accept: () => void;
  acceptText: string;
  loading?: boolean;
  children: React.ReactNode;
}

export default function AlertDialog(props: AlertDialogProps) {
  const { children, title, accept, acceptText, loading, ...restProps } = props;

  return (
    <TAlertDialog native>
      <TAlertDialog.Trigger asChild>{children}</TAlertDialog.Trigger>
      <TAlertDialog.Portal>
        <TAlertDialog.Overlay
          key="overlay"
          animation="quick"
          backgroundColor="$grey3"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <TAlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          {loading && (
            <YStack>
              <Spinner size="large" color={"$textColor"} />
            </YStack>
          )}
          {!loading && (
            <YStack>
              <TAlertDialog.Title>{title}</TAlertDialog.Title>
              {/* <TAlertDialog.Description>{title}</TAlertDialog.Description> */}
              <XStack gap="$3" justifyContent="flex-end">
                <TAlertDialog.Cancel asChild>
                  <Button type="normal">
                    <Button.Text>Cancel</Button.Text>
                  </Button>
                </TAlertDialog.Cancel>
                <TAlertDialog.Action asChild onPress={accept}>
                  <Button type="normal">
                    <Button.Text>{acceptText}</Button.Text>
                  </Button>
                </TAlertDialog.Action>
              </XStack>
            </YStack>
          )}
        </TAlertDialog.Content>
      </TAlertDialog.Portal>
    </TAlertDialog>
  );
}
