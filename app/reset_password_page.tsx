import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { styled, View, Button, Text, YStack } from "tamagui";
import Input from "@/components/atoms/Input";
import { supabase } from "@/utils/supabase/supabase";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  // const { token } = useLocalSearchParams();

  const handleResetPassword = async () => {
    // if (!token) {
    //   setError("No reset token found. Please request a new password reset.");
    //   return;
    // }

    if (email === "") {
      setError("Email is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        email: email,
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.replace("/account_management");
      }, 2000);
    } catch (error: any) {
      setError(
        error.message || "An error occurred while resetting your password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <YStack space="$4" width="100%" maxWidth={400}>
        <Title>Reset Password</Title>

        {success ? (
          <SuccessMessage>
            Password successfully reset! Redirecting to login...
          </SuccessMessage>
        ) : (
          <>
            <Input
              label="Email"
              placeholder="Email"
              secureTextEntry
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <Input
              label="New Password"
              placeholder="New Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />

            <Input
              label="Confirm New Password"
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button
              onPress={handleResetPassword}
              disabled={loading}
              backgroundColor={loading ? "$gray5" : "$blue10"}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </>
        )}
      </YStack>
    </Container>
  );
};

const Container = styled(View, {
  flex: 1,
  padding: "$4",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$background",
});

const Title = styled(Text, {
  fontSize: "$8",
  fontWeight: "bold",
  marginBottom: "$4",
  textAlign: "center",
});

const ErrorMessage = styled(Text, {
  color: "$red10",
  textAlign: "center",
});

const SuccessMessage = styled(Text, {
  color: "$green10",
  textAlign: "center",
});

export default ResetPasswordPage;
