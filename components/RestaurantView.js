import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const localRestaurants = [
  {
    name: "Beachside Bar",
    image_url:
      "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Benihana",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: "India's Grill",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,
  },
];

const RestaurantView = ({ restaurantData }) => {
  console.log("RestaurantData", restaurantData);
  return (
    <>
      {restaurantData?.map((restaurant, index) => (
        <TouchableOpacity activeOpacity={1} key={index}>
          <View style={tw`bg-white my-3 p-2`}>
            <View>
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "cover",
                  position: "relative",
                }}
                source={{
                  uri: restaurant.image_url,
                }}
              />
              <TouchableOpacity style={tw`absolute top-3 right-3`}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={25}
                  color="white"
                />
              </TouchableOpacity>
              <View style={tw`flex-row justify-between items-center my-5`}>
                <View>
                  <Text style={tw`font-bold text-lg`}>{restaurant.name}</Text>
                  <Text style={tw`text-gray-400 text-base`}>
                    {restaurant.price}
                  </Text>
                </View>
                <View
                  style={tw`bg-gray-300 rounded-full w-10 h-10 items-center justify-center`}
                >
                  <Text>{restaurant.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default RestaurantView;

const styles = StyleSheet.create({});
