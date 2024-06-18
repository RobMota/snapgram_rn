import { fileUpload } from "@/constants/icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "../CustomButton";

type ImageViwerProps = {
  selectedImage: File[] | string;
  onChangeImage: (file: ImagePicker.ImagePickerAsset) => void;
};

export default function ImageViewer({
  selectedImage,
  onChangeImage,
}: ImageViwerProps) {
  const [fileUrl, setfileUrl] = useState(() => !selectedImage && fileUpload);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChangeImage(result.assets[0]);
      setfileUrl(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <>
      <Text className="text-white my-3">Add Photo</Text>
      {fileUrl ? (
        <View className="items-center justify-center p-5">
          <Image
            source={{ uri: fileUrl }}
            className=" h-80 min-w-full rounded-[24px] object-cover"
          />
          <CustomButton
            title="Click to replace"
            handlePress={pickImageAsync}
            containerStyles="mt-4 text-[#5C5C7B] bg-transparent
						text-[14px] font-normal"
          />
        </View>
      ) : (
        <View className="justify-center items-center p-7 h-80">
          <Image source={fileUpload} width={96} height={77} alt="file upload" />

          <Text className="text-[#5C5C7B] text-[14px] font-normal mb-6">
            SVG, PNG, JPG
          </Text>
          <CustomButton
            title="Choose a photo"
            handlePress={pickImageAsync}
            containerStyles="h-12 px-5 text-[#FFF] flex gap-2 bg-[#1F1F22]"
          />
        </View>
      )}
    </>
  );
}
