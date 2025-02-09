import {
  Spinner,
  AlertDialog as TAlertDialog,
  AlertDialogProps as TAlertDialogProps,
  XStack,
  YStack,
} from "tamagui";
import { TouchableOpacity } from "react-native";

interface AlertDialogProps extends TAlertDialogProps {
  data?: any;
  error?: any;
  loading?: boolean;
  children: React.ReactNode;
}

export default function AlertDialog(props: AlertDialogProps) {
  const { children, data, error, loading, ...restProps } = props;

  return (
    <TAlertDialog native>
      <TAlertDialog.Trigger asChild>{children}</TAlertDialog.Trigger>
      <TAlertDialog.Portal>
        <TAlertDialog.Overlay
          key="overlay"
          animation="quick"
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
          {!loading && error && (
            <YStack>
              <TAlertDialog.Title>Error</TAlertDialog.Title>
              <TAlertDialog.Description>
                {error.message}
              </TAlertDialog.Description>
              <XStack gap="$3" justifyContent="flex-end">
                <TAlertDialog.Cancel asChild>
                  <TouchableOpacity>Cancel</TouchableOpacity>
                </TAlertDialog.Cancel>
                <TAlertDialog.Action asChild>
                  <TouchableOpacity>Accept</TouchableOpacity>
                </TAlertDialog.Action>
              </XStack>
            </YStack>
          )}
          {!loading && !error && data && (
            <YStack>
              <TAlertDialog.Title>Success</TAlertDialog.Title>
              <TAlertDialog.Description>
                {data.message}
              </TAlertDialog.Description>
              <XStack gap="$3" justifyContent="flex-end">
                <TAlertDialog.Cancel asChild>
                  <TouchableOpacity>Cancel</TouchableOpacity>
                </TAlertDialog.Cancel>
                <TAlertDialog.Action asChild>
                  <TouchableOpacity>Accept</TouchableOpacity>
                </TAlertDialog.Action>
              </XStack>
            </YStack>
          )}
        </TAlertDialog.Content>
      </TAlertDialog.Portal>
    </TAlertDialog>
  );
}
