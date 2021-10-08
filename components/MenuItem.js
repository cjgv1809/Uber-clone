import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, setAddItemToCart } from "../slices/cartSlice";

const MenuItem = ({ restaurantName, foods, hideCheckbox, marginRight }) => {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch(
      setAddItemToCart({
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      })
    );
  const cartItems = useSelector(selectItems);
  const foodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods?.map((food, index) => (
        <View key={index}>
          <View style={tw`flex-row justify-between items-center m-5`}>
            {!hideCheckbox ? (
              <BouncyCheckbox
                iconStyle={{ borderRadius: 0, borderColor: "lightgray" }}
                fillColor="green"
                size={23}
                isChecked={foodInCart(food, cartItems)}
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
              />
            ) : (
              <></>
            )}
            <View style={tw`justify-evenly w-3/5`}>
              <Text style={tw`text-lg font-bold`}>{food.title}</Text>
              <Text style={tw`text-gray-500 text-sm`}>{food.description}</Text>
              <Text style={tw`font-bold text-base`}>{food.price}</Text>
            </View>
            <View style={tw`ml-3`}>
              <Image
                source={{ uri: food.image }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  resizeMode: "cover",
                  marginRight: marginRight ? marginRight : 0,
                }}
              />
            </View>
          </View>
          <Divider width={0.5} orientation="vertical" style={tw`mx-5`} />
        </View>
      ))}
    </ScrollView>
  );
};

export default MenuItem;

const styles = StyleSheet.create({});
