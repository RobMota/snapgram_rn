import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import ImageViewer from "@/components/shared/ImageViewer";
import { addPost } from "@/constants/icons";
import { useGlobalContext } from "@/context/GlobalContext";
import { createPost } from "@/lib/appwrite/api";
import { PostValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const Create = () => {
  const { user } = useGlobalContext();

  const { control, handleSubmit } = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: "",
      file: [],
      location: "",
      tags: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      Alert.alert("Please try again");
    }

    return <Redirect href={"/home"} />;
  };

  return (
    <>
      <SafeAreaView className="bg-[#000] h-full px-4">
        <ScrollView>
          <View className="flex-1 items-center">
            <View className="items-center w-full mt-7 h-full">
              <View className="items-center flex-row justify-start w-full">
                <Image
                  source={addPost}
                  alt="add post"
                  className="w-10 h-10 mr-3"
                />
                <Text className="text-[30px] font-bold text-left w-full text-white">
                  Create Post
                </Text>
              </View>
              <View className="mt-5 w-full">
                <Controller
                  control={control}
                  name="caption"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormField
                      label="Caption"
                      value={value}
                      errorMessage={error?.message}
                      onChangeText={onChange}
                      containerStyles="mt-5"
                      inputStyles="rounded-xl border-none bg-[#101012] text-[#EFEFEF] w-full px-3 py-3"
                      numberOfLines={4}
                      multiline
                      textAlignVertical="top"
                    />
                  )}
                />
              </View>

              <View className="mt-4 w-full">
                <Text className="text-white my-3">Add Photo</Text>
                <View className="justify-center items-center flex-col bg-[#101012] rounded-xl">
                  <Controller
                    control={control}
                    name="file"
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <ImageViewer
                          selectedImage={value}
                          onChangeImage={onChange}
                        />
                        {!!error?.message && (
                          <Text className="text-red-500">{error?.message}</Text>
                        )}
                      </>
                    )}
                  />
                </View>
              </View>

              <View className="w-full">
                <Controller
                  control={control}
                  name="location"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormField
                      label="Add Location"
                      value={value}
                      errorMessage={error?.message}
                      onChangeText={onChange}
                      containerStyles="mt-5"
                      inputStyles="rounded-xl h-12 border-none bg-[#1F1F22] w-full text-white px-3 py-2"
                    />
                  )}
                />
              </View>

              <View className="w-full">
                <Controller
                  control={control}
                  name="tags"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormField
                      label={`Add Tags (separated by comma " , ")`}
                      value={value}
                      errorMessage={error?.message}
                      onChangeText={onChange}
                      containerStyles="mt-5"
                      inputStyles="rounded-xl h-12 border-none bg-[#1F1F22] w-full text-white px-3 py-2"
                    />
                  )}
                />
              </View>
              <View className="flex flex-row mt-7 mb-10 w-full items-center justify-end">
                <CustomButton
                  title="Cancel"
                  containerStyles="px-5 flex bg-[#1F1F22] w-24 mr-5"
                  textStyle="text-white"
                  handlePress={() => router.replace("/home")}
                />
                <CustomButton
                  title="Submit"
                  containerStyles="flex bg-[#877EFF] w-24"
                  textStyle="text-white"
                  handlePress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#000" />
    </>
  );
};

export default Create;
