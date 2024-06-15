import { home } from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

type TabIconProps = {
  icon: number;
  name: string;
  focused: boolean;
};

const TabIcon = ({ icon, name, focused }: TabIconProps) => {
  return (
    <View
      className={`items-center justify-center p-3 rounded-[10px] ${
        focused ? "bg-[#877EFF]" : "#09090A"
      }`}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={`${focused ? "white" : "#877EFF"}`}
        className="w-5 h-5 mb-2"
      />
      <Text className="text-white text-xs">{name}</Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#09090A",
        tabBarStyle: {
          backgroundColor: "#09090A",
          borderTopWidth: 1,
          borderTopColor: "#09090A",
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={home} name="Home" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
