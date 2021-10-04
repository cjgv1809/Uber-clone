import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const OrderItem = ({ item }) => {
  const { title, price } = item;
  return (
    <View style={tw`flex-row justify-between p-5 border-b border-gray-300`}>
      <Text style={tw`font-semibold text-base`}>{title}</Text>
      <Text style={tw`text-gray-400 text-base`}>{price}</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({});
