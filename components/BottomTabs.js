import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import IconTab from "./IconTab";

const BottomTabs = () => {
  return (
    <View style={tw`flex-row justify-between p-2`}>
      <IconTab icon="home" text="Home" />
      <IconTab icon="search" text="Browse" />
      <IconTab icon="shopping-bag" text="Grocery" />
      <IconTab icon="receipt" text="Orders" />
      <IconTab icon="user" text="Account" />
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
