import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectItems, selectRestaurantName } from "../slices/cartSlice";
import OrderItem from "./OrderItem";
import db from "../firebase";
import firebase from "firebase";
import LottieView from "lottie-react-native";

const ViewCart = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const items = useSelector(selectItems);
  const restName = useSelector(selectRestaurantName);
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const addOrderToFirebase = () => {
    setLoading(true);
    db.collection("orders")
      .add({
        items: items,
        restaurantName: restName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          navigation.navigate("OrderCompletedScreen");
        }, 2500);
      })
      .catch((error) => console.log(error));
  };

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={styles.subtotalText}>{totalUSD}</Text>
            </View>
            <View style={styles.checkoutButtonContainer}>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => {
                  addOrderToFirebase();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
                <Text style={styles.checkoutButtonText}>
                  {total ? totalUSD : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={tw`flex-1 items-center justify-center flex-row absolute bottom-10`}
        >
          <View style={tw`flex-row justify-center w-full`}>
            <TouchableOpacity
              style={tw`mt-5 flex-row bg-black items-center justify-evenly p-3 rounded-full w-2/3 relative`}
              onPress={() => setModalVisible(true)}
            >
              <Text style={tw`text-white text-lg`}>View Cart</Text>
              <Text style={tw`text-white text-lg`}>{totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={tw`bg-black absolute items-center justify-center w-full h-full`}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewCart;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: "auto",
    borderWidth: 1,
  },
  restaurantName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  subtotalText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
  },
  checkoutButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 13,
    borderRadius: 30,
    width: 300,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 20,
  },
});
