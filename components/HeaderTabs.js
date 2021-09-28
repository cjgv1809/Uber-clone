import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import HeaderButton from "./HeaderButton";

const HeaderTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={tw`flex-row self-center`}>
      <HeaderButton
        text="Delivery"
        buttonColor="black"
        textColor="white"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        buttonColor="white"
        textColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
};

export default HeaderTabs;

const styles = StyleSheet.create({});
