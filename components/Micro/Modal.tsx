import {
  StyleSheet,
  Modal as RNModal,
  ModalProps as RNModalProps,
  ViewStyle as RNViewStyle,
} from "react-native";
import { TamaguiElement, View as TView } from "tamagui";

interface ModalProps extends RNModalProps {
  children?: React.ReactNode;
  modalVisible: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  styles?: RNViewStyle | RNViewStyle[];
  ref?: React.ForwardedRef<RNModal>;
}

const Modal = (props: ModalProps) => {
  const { children, modalVisible, styles, ref, setModalVisible, ...restProps } =
    props;

  return (
    <RNModal
      testID="modal"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible && setModalVisible(false);
      }}
      {...defaultProps}
      {...restProps}
      ref={ref}
    >
      <TView style={[localStyles.modal, styles]}>{children}</TView>
    </RNModal>
  );
};

const defaultProps: RNModalProps = {
  animationType: "fade",
  statusBarTranslucent: true,
  transparent: true,
};

const localStyles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 16,
  },
});

export default Modal;
