import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const IconTab = ({ icon, text }) => {
  return (
    <TouchableOpacity>
      <FontAwesome5 name={icon} size={18} style={tw`mb-1 self-center`} />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default IconTab;

const styles = StyleSheet.create({});
