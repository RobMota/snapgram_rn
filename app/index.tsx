import { logo } from "@/constants/images";
import { useGlobalContext } from "@/context/GlobalContext";
import { Redirect } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (isLoading) {
    return (
      <View className="items-center flex-1 justify-center bg-black">
        <Image source={logo} alt="logo" />
      </View>
    );
  }

  if (isLoading && isLoggedIn) {
    return <Redirect href={"/home"} />;
  } else {
    return <Redirect href={"/sign-in"} />;
  }
}
