import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectItems, selectRestaurantName } from "../slices/cartSlice";
import LottieView from "lottie-react-native";
import db from "../firebase";
import MenuItem from "../components/MenuItem";

const OrderCompletedScreen = () => {
  const [lastOrder, setLastOrder] = useState([]);
  const items = useSelector(selectItems);
  const restName = useSelector(selectRestaurantName);
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const unsubscribe = db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => setLastOrder(doc.data()));
      });

    return unsubscribe();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* green checkmark */}
      <LottieView
        style={{
          height: 100,
          alignSelf: "center",
          marginVertical: 30,
        }}
        source={require("../assets/animations/check-mark.json")}
        autoPlay
        speed={0.5}
        loop={false}
      />
      <Text>
        Your Order at {restName} has been placed for {totalUSD}
      </Text>
      <MenuItem foods={lastOrder} hideCheckbox={true} />
      {/* cooking animation */}
      <LottieView
        style={{ height: 200, alignSelf: "center" }}
        source={require("../assets/animations/cooking.json")}
        autoPlay
        speed={0.5}
        loop={true}
      />
    </SafeAreaView>
  );
};

export default OrderCompletedScreen;

const styles = StyleSheet.create({});
