import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const items = [
  {
    image: require("../assets/images/shopping-bag.png"),
    text: "Pick-up",
  },
  {
    image: require("../assets/images/soft-drink.png"),
    text: "Soft Drinks",
  },
  {
    image: require("../assets/images/bread.png"),
    text: "Bakery Items",
  },
  {
    image: require("../assets/images/fast-food.png"),
    text: "Fast Foods",
  },
  {
    image: require("../assets/images/deals.png"),
    text: "Deals",
  },
  {
    image: require("../assets/images/coffee.png"),
    text: "Coffe & Tea",
  },
  {
    image: require("../assets/images/desserts.png"),
    text: "Desserts",
  },
];

const Categories = () => {
  return (
    <View style={tw`bg-white shadow-md`}>
      <FlatList
        keyExtractor={(item) => item.text}
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={tw`mr-5 items-center p-2`}>
            <Image
              source={item.image}
              style={{ width: 50, height: 40, resizeMode: "contain" }}
            />
            <Text style={tw`text-sm font-semibold`}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
