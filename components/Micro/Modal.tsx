import { Modal as RNModal } from "react-native";
import { styled, View as TView, ViewProps as TViewProps } from "tamagui";

interface ModalProps extends TViewProps {
  children?: React.ReactNode;
  modalVisible: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: React.ForwardedRef<RNModal>;
}

const Modal = (props: ModalProps) => {
  const { children, modalVisible, ref, setModalVisible, ...restProps } = props;

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

const ViewStyled = styled(TView, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(132, 98, 88, 0.55)",
  padding: "$lg",
});

export default Modal;
