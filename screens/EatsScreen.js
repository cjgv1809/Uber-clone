import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import Categories from "../components/Categories";
import HeaderTabs from "../components/HeaderTabs";
import RestaurantView, { localRestaurants } from "../components/RestaurantView";
import SearchBar from "../components/SearchBar";
import { YELP_API_KEY } from "@env";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/BottomTabs";
import { useNavigation } from "@react-navigation/core";

const EatsScreen = () => {
  const navigation = useNavigation();
  const [restaurantData, setRestaurantData] = useState([]);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={tw`bg-gray-200 h-full`}>
      <View style={tw`py-3 px-2 bg-white mt-10 mb-3`}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <Categories />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantView
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
};

export default EatsScreen;

const styles = StyleSheet.create({});
