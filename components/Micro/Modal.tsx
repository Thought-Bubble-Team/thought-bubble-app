import {
  StyleSheet,
  Modal as RNModal,
  ModalProps as RNModalProps,
  ViewStyle as RNViewStyle,
} from "react-native";
import { View as TView } from "tamagui";

interface ModalProps extends RNModalProps {
  children?: React.ReactNode;
  modalVisible: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  styles?: RNViewStyle | RNViewStyle[];
}

const Modal = (props: ModalProps) => {
  const { children, modalVisible, styles, setModalVisible, ...restProps } =
    props;

  return (
    <RNModal
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible && setModalVisible(false);
      }}
      {...defaultProps}
      {...restProps}
    >
      <TView style={[localStyles.modal, styles]}>{children}</TView>
    </RNModal>
  );
};

const defaultProps: RNModalProps = {
  animationType: "fade",
  statusBarTranslucent: true,
};

const localStyles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    opacity: 0.5,
  },
});

export default Modal;
