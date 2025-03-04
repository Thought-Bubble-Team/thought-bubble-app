import { ModalProps as RNModalProps } from "react-native";

import Modal from "@/components/atoms/Modal";
import MyCard from "../atoms/MyCard";
import Text from "../atoms/Text";

interface AlertProps extends RNModalProps {
  children?: React.ReactNode;
  header: string;
  message: string;
  buttonText: string;
  modalVisible: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Alert = (props: AlertProps) => {
  const {
    children,
    header,
    message,
    buttonText,
    modalVisible,
    setModalVisible,
    ...restProps
  } = props;

  return (
    <Modal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      paddingHorizontal={48}
      {...restProps}
    >
      <MyCard headerTitle={header}>
        <Text>{message}</Text>
      </MyCard>
    </Modal>
  );
};

export default Alert;
