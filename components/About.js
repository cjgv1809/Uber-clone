import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const About = ({ route }) => {
  const { name, image, price, reviews, rating, categories } = route.params;

  const formattedCategories = categories.map((cat) => cat.title).join(" • ");

  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;

  return (
    <View>
      <Image
        source={{ uri: image }}
        style={{ width: "100%", height: 180, resizeMode: "cover" }}
      />
      <Text style={tw`font-bold mt-2 mx-4 text-xl`}>{name}</Text>
      <Text style={tw`font-semibold my-1 mx-4 text-gray-400 text-lg`}>
        {description}
      </Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
