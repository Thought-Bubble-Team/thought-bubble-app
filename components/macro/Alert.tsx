import { ModalProps as RNModalProps } from "react-native";

import Modal from "@/components/atoms/Modal";
import { Card } from "@/components/atoms/Card";
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
      <Card>
        <Card.Header>
          <Card.HeaderText>{header}</Card.HeaderText>
          <Card.Body>
            <Card.Body>
              <Text>{message}</Text>
            </Card.Body>
          </Card.Body>
        </Card.Header>
      </Card>
    </Modal>
  );
};

export default Alert;
