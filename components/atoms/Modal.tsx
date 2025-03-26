import useTBTheme from "@/utils/stores/usePersonalStore";
import { Modal as RNModal } from "react-native";
import {
  styled,
  View as TView,
  ViewProps as TViewProps,
  useTheme,
} from "tamagui";

interface ModalProps extends TViewProps {
  children?: React.ReactNode;
  modalVisible: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: React.ForwardedRef<RNModal>;
}

const Modal = (props: ModalProps) => {
  const theme = useTheme();
  const themeStore = useTBTheme();
  const { children, modalVisible, ref, setModalVisible, ...restProps } = props;

  const backgroundColor =
    themeStore.theme === "light"
      ? "rgba(132, 98, 88, 0.55)"
      : "rgba(74, 144, 226, 0.35)";

  const ViewStyled = styled(TView, {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor,
    padding: "$lg",
  });

  return (
    <RNModal
      testID="modal"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible && setModalVisible(false);
      }}
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      ref={ref}
    >
      <ViewStyled {...restProps}>{children}</ViewStyled>
    </RNModal>
  );
};

export default Modal;
