import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectItems, selectRestaurantName } from "../slices/cartSlice";
import LottieView from "lottie-react-native";
import db from "../firebase";
import MenuItem from "../components/MenuItem";
import { useNavigation } from "@react-navigation/core";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const OrderCompletedScreen = () => {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Bologna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
      },
    ],
  });
  const items = useSelector(selectItems);
  const restName = useSelector(selectRestaurantName);
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const navigation = useNavigation();

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setLastOrder(doc.data());
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* green checkmark */}
      <View style={tw`mx-2 my-3 items-center h-full`}>
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
        <Text style={tw`mt-3 font-semibold text-lg text-center`}>
          Your Order at <Text style={tw`font-bold`}>{restName}</Text> has been
          placed for <Text style={tw`font-bold`}>{totalUSD}</Text>
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItem
            foods={lastOrder.items}
            hideCheckbox={true}
            marginRight={10}
          />
          <TouchableOpacity
            style={tw`bg-black w-1/2 my-5 p-3 mx-auto items-center justify-center rounded-full`}
            onPress={() => navigation.navigate("EatsScreen")}
          >
            <Text style={tw`font-bold text-white text-base`}>Go to Home</Text>
          </TouchableOpacity>
          {/* cooking animation */}
          <LottieView
            style={{ height: 200, alignSelf: "center", marginBottom: 50 }}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
            loop={true}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderCompletedScreen;

const styles = StyleSheet.create({});
