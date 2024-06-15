import Loader from "@/components/shared/Loader";
import { useGlobalContext } from "@/context/GlobalContext";
import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (isLoading) {
    return (
      <View className="items-center flex-1 justify-center">
        <Loader />
      </View>
    );
  }

  if (isLoading && isLoggedIn) {
    return <Redirect href={"/home"} />;
  } else {
    return <Redirect href={"/sign-in"} />;
  }
}
