import Loader from "@/components/shared/Loader";
import React from "react";
import { ButtonProps, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps extends ButtonProps {
  textStyle?: string;
  handlePress?: () => void;
  isLoading?: boolean;
  containerStyles?: string;
}

const CustomButton = ({
  title,
  handlePress,
  isLoading,
  containerStyles,
  textStyle,
  ...buttonProps
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`w-full bg-[#877EFF] rounded-md py-2 items-center  ${containerStyles}
      ${isLoading ? "opacity-50" : ""}
      `}
      {...buttonProps}
    >
      {isLoading ? <Loader /> : <Text className="text-white">{title}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
