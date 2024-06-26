import { logout, profilePlaceholder } from "@/constants/icons";
import { logo } from "@/constants/images";
import { useGlobalContext } from "@/context/GlobalContext";
import { signOut } from "@/lib/appwrite/api";
import { Link, router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const TopBar = () => {
  const { user } = useGlobalContext();

  const handleSignOut = () => {
    signOut();
    router.replace("/sign-in");
  };

  return (
    <View className="flex-row w-full bg-[#101012] px-4">
      <View className="flex-row justify-between h-16 w-full">
        <Link href="/home">
          <Image source={logo} alt="logo" />
        </Link>
        <View className="flex-row justify-center items-center">
          <TouchableOpacity onPress={handleSignOut}>
            <Image source={logout} alt="logout" className="h-7 w-7 mr-3" />
          </TouchableOpacity>

          <Image
            source={{ uri: user?.imageUrl } || profilePlaceholder}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
        </View>
      </View>
    </View>
  );
};

export default TopBar;
