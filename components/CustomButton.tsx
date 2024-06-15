import Loader from "@/components/shared/Loader";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  title: string;
  textStyle?: string;
  handlePress?: () => void;
  isLoading?: boolean;
  containerStyles?: string;
};

const CustomButton = ({
  title,
  handlePress,
  isLoading,
  containerStyles,
  textStyle,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`w-full bg-[#877EFF] rounded-md py-2 items-center ${containerStyles}
      ${isLoading ? "opacity-50" : ""}
      `}
    >
      {isLoading ? <Loader /> : <Text className="text-white">{title}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
