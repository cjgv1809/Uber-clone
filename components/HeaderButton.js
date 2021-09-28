import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const HeaderButton = ({
  text,
  buttonColor,
  textColor,
  setActiveTab,
  activeTab,
}) => {
  return (
    <TouchableOpacity
      style={[
        tw`bg-${buttonColor}`,
        activeTab === text ? tw`bg-black` : tw`bg-white`,
        styles.container,
      ]}
      onPress={() => setActiveTab(text)}
    >
      <Text
        style={[
          tw`text-${textColor}`,
          activeTab === text ? tw`text-white` : tw`text-black`,
          styles.text,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
