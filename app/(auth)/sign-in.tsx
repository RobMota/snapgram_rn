import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { logo } from "@/constants/images";
import { signIn } from "@/lib/appwrite/api";
import { SigninValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const SignUp = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmittig, setIsSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof SigninValidation>) => {
    setIsSubmitting(true);

    try {
      await signIn(data.email, data.password);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("sign-in Error: ", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#000] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-12">
          <Image source={logo} resizeMode="contain" />
          <Text className="text-2xl text-white mt-10 mb-3 font-bold">
            Create a new account
          </Text>
          <Text className="text-[#7878A3] text-center">
            To use Snapgram, please enter your account details.
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormField
                label="Email"
                value={value}
                errorMessage={error?.message}
                onChangeText={onChange}
                containerStyles="mt-5"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormField
                label="Password"
                value={value}
                errorMessage={error?.message}
                onChangeText={onChange}
                containerStyles="mt-5"
              />
            )}
          />

          <CustomButton
            handlePress={handleSubmit(onSubmit)}
            title="Sign up"
            containerStyles="mt-5"
            isLoading={isSubmittig}
          />

          <Text className="mt-5 text-[#EFEFEF] ">
            Don't have an account?
            <Link href="/sign-up" style={{ color: "blue" }}>
              <Text className="text-[#877EFF]"> Sign up</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
