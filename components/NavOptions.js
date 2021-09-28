import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectOrigin } from "../slices/navSlice";

// FlatList is vertical by default and draggable

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <View style={tw`mx-auto my-2 bg-black shadow-md rounded-xl`}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                item.screen === "MapScreen" ? "MapScreen" : "EatsScreen"
              )
            }
            style={tw`px-4 pb-8 pt-4 bg-gray-200 m-1 rounded-xl`}
            disabled={!origin}
          >
            <View style={tw`${!origin && "opacity-20"}`}>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                }}
                source={{ uri: item.image }}
              />
              <Text style={tw`mt-2 text-lg text-center font-semibold`}>
                {item.title}
              </Text>
              <Icon
                style={tw`p-2 mt-4 rounded-full w-10 mx-auto bg-black`}
                name="arrowright"
                color="white"
                type="antdesign"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;
