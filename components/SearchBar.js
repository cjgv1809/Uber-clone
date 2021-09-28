import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import Ionicon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { GOOGLE_MAPS_API_KEY } from "@env";

const SearchBar = ({ cityHandler }) => {
  return (
    <View style={tw`flex-row mt-10`}>
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        query={{ key: GOOGLE_MAPS_API_KEY, language: "en" }}
        onPress={(data, details = null) => {
          const city = data.description.split(",")[0];
          cityHandler(city);
        }}
        placeholder="Search"
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "500",
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={tw`ml-3`}>
            <Ionicon name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={tw`flex-row mr-2 bg-white p-2 rounded-full items-center`}
          >
            <AntDesign name="clockcircle" size={11} />
            <Text style={tw`ml-1`}>Search</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
