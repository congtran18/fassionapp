import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from "../../store/actions/orders";

const OrdersScreen = (props) => {

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          sum={itemData.item.sum}
          date={itemData.item.readableDate}
          productTitle={itemData.item.productTitle}
          quantity={itemData.item.quantity}
          productPrice={itemData.item.productPrice}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Menu'
        iconName='ios-menu'
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  displayText: {
    fontSize: 18,
    fontWeight: "bold",
    //color: Platform.OS === "android" ? "white" : Colors.primary,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
