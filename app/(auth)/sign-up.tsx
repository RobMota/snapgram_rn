import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { logo } from "@/constants/images";
import { useGlobalContext } from "@/context/GlobalContext";
import { createAccount } from "@/lib/appwrite/api";
import { SignupValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const SignUp = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { setIsLoggedIn, setUser } = useGlobalContext();
  const [isSubmittig, setIsSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof SignupValidation>) => {
    setIsSubmitting(true);
    try {
      const currentAccount = await createAccount(data);

      if (!currentAccount) {
        Alert.alert("Something went wrong. Please login your new account");
        router.navigate("/sign-in");
        return;
      } else {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsLoggedIn(true);
        router.replace("/home");
      }
    } catch (error: any) {
      Alert.alert("Error: ", error.message);
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
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormField
                label="Name"
                value={value}
                errorMessage={error?.message}
                onChangeText={onChange}
                containerStyles="mt-7"
                inputStyles="bg-[#1F1F22] rounded-md h-12 justify-center"
              />
            )}
          />

          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormField
                label="Username"
                value={value}
                errorMessage={error?.message}
                onChangeText={onChange}
                containerStyles="mt-4"
                inputStyles="bg-[#1F1F22] rounded-md h-12 justify-center"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormField
                label="Email"
                value={value}
                errorMessage={error?.message}
                onChangeText={onChange}
                containerStyles="mt-4"
                inputStyles="bg-[#1F1F22] rounded-md h-12 justify-center"
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
                containerStyles="mt-4"
                inputStyles="bg-[#1F1F22] rounded-md h-12 justify-center"
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
            Already have a account?
            <Link href="/sign-in">
              <Text className="text-[#877EFF]"> Log in</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
