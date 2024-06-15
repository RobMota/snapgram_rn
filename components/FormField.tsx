import { Text, TextInput, TextInputProps, View } from "react-native";

interface FormFieldProps extends TextInputProps {
  errorMessage?: string;
  label: string;
  containerStyles: string;
  inputStyles?: string;
}

const FormField = ({
  label,
  containerStyles,
  errorMessage,
  inputStyles,
  ...textInputProps
}: FormFieldProps) => {
  return (
    <View
      className={`w-full self-start space-y-2 text-base  ${containerStyles}`}
    >
      <Text className="text-white">{label}</Text>
      <View className=" h-12 bg-[#1F1F22] border-none rounded-md flex justify-center">
        <TextInput
          className={`placeholder:text-white  px-3 ${inputStyles}`}
          secureTextEntry={label === "Password" ? true : false}
          {...textInputProps}
        />
      </View>
      {!!errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
    </View>
  );
};
export default FormField;
