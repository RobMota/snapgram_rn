import TopBar from "@/components/TopBar";
import PostCard from "@/components/shared/PostCard";
import { getRecentPosts } from "@/lib/appwrite/api";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    getRecentPosts()
      .then((response: any) => {
        if (response) {
          setPosts(response);
        } else {
          Alert.alert("No data");
        }
      })
      .catch((error: any) => {
        Alert.alert("home Error: ", error.message);
      });
  }, []);

  return (
    <SafeAreaView className="bg-[#000] h-full ">
      <TopBar />
      <View className="flex flex-1 items-center px-4">
        <View className="flex items-center w-full mt-7 h-full">
          <Text className="text-[30px] font-bold text-left w-full text-white">
            Home Feed
          </Text>
          <View className="flex flex-1 w-full mt-5">
            <FlatList
              data={posts}
              keyExtractor={({ posts }) => posts?.item?.$id}
              renderItem={({ item }) => <PostCard post={item} key={item.$id} />}
            />
          </View>
        </View>
      </View>
      <StatusBar backgroundColor="#101012" style="light" />
    </SafeAreaView>
  );
};

export default Home;
