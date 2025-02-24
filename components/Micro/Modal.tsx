import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  ViewStyle as RNViewStyle,
} from "react-native";
import { styled, View as TView } from "tamagui";

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
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      {...restProps}
      ref={ref}
    >
      <ViewStyled>{children}</ViewStyled>
    </RNModal>
  );
};

const ViewStyled = styled(TView, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$grey5",
  padding: 16,
  opacity: 0.5,
});

export default Modal;
