import { ModalProps as RNModalProps } from "react-native";

import Modal from "@/components/Micro/Modal";
import MyCard from "../Micro/MyCard";
import Text from "../Micro/Text";

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
      styles={{ paddingHorizontal: 48 }}
      {...restProps}
    >
      <MyCard headerTitle={header}>
        <Text>{message}</Text>
      </MyCard>
    </Modal>
  );
};

export default Alert;
