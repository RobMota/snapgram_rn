import { edit, liked, saved } from "@/constants/icons";
import { landscape, profile } from "@/constants/images";
import { multiFormatDateString } from "@/utils";
import React from "react";
import { Image, Text, View } from "react-native";
import { Models } from "react-native-appwrite";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <View className="flex flex-1 w-full mt-5">
      <View className="bg-[#09090A] rounded-3xl border border-[#1F1F22] p-5">
        <View className="flex flex-row justify-between items-center">
          <View className="flex gap-3 flex-row items-center">
            <Image
              source={{ uri: post?.creator?.imageUrl } || profile}
              className="rounded-full w-12 h-12"
            />
            <View className="flex">
              <Text className="text-[18px] font-medium  text-white">
                {post.creator.name}
              </Text>
              <View className="flex-center gap-2 flex-row">
                <Text className="text-[12px] font-semibold text-[#7878A3]">
                  {multiFormatDateString(post.$createdAt)}
                </Text>
                <Text className="text-[12px] font-semibold text-[#7878A3]">
                  {post.location}
                </Text>
              </View>
            </View>
          </View>

          <Image source={edit} alt="edit" className="w-6 h-6" />
        </View>
        <View>
          <Text className="text-[14px] text-white font-medium mt-3 ml-2">
            {post.caption}
          </Text>
          <View className="flex flex-row gap-1 my-0 ml-1">
            {post.tags.map((tag: string) => (
              <View className="flex-row" key={tag}>
                <Text className="text-[#7878A3] lowercase">#{tag}</Text>
              </View>
            ))}
          </View>
          <Image
            source={{ uri: post.imageUrl } || landscape}
            alt="post image"
            className="rounded-3xl h-64 mt-5"
          />
        </View>

        <View className="flex flex-row justify-between items-center px-1 mt-3 ">
          <View className="flex-row items-center">
            <Image source={liked} alt="like" className="w-6 h-6" />
            <Text className="text-[14px] font-medium text-white ml-2">2</Text>
          </View>
          <View className="flex-row">
            <View>
              <Image source={saved} alt="save" className="w-6 h-6" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
