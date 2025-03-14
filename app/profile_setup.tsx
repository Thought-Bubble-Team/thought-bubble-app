import Screen from "@/components/atoms/Screen";
import EditProfile from "@/components/macro/EditProfile";
import { styled, View } from "tamagui";

const OnboardingPage = () => {
  return (
    <FormContainer>
      <EditProfile />
    </FormContainer>
  );
};

const FormContainer = styled(View, {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "90%",
  paddingHorizontal: "$4",
  paddingVertical: "$8",
  backgroundColor: "$grey1",
  borderTopLeftRadius: 32,
  borderTopRightRadius: 32,
  elevationAndroid: 8,
});

export default OnboardingPage;
