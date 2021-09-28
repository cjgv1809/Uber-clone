import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import "intl";
import "intl/locale-data/jsonp/en";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// If we have Surge pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`m-auto w-full mb-2`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 z-50 rounded-full p-3 bg-black`}
        >
          <Icon name="chevron-left" type="fontawesome" color="white" />
        </TouchableOpacity>
        <Text style={tw`py-5 text-xl text-center ml-10`}>
          Select a Ride -{" "}
          {`${(travelTimeInformation?.distance?.value / 1000).toFixed(1)} km`}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-around items-center px-2 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{ width: 95, height: 95, resizeMode: "contain" }}
              source={{ uri: image }}
            />
            <View style={tw`flex-1 mr-auto ml-4`}>
              <Text style={tw`text-lg font-semibold`}>{title}</Text>
              <Text style={tw`text-gray-500 text-sm`}>
                {travelTimeInformation?.duration?.text} Travel Time
              </Text>
            </View>
            <Text style={tw`text-xl font-semibold`}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200 p-2`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black p-3 rounded-full ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
