import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  View,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CATEGORIES } from '../../data/dummy-data';
import ProductItem from "../../components/shop/ProductItem";
import * as productsActions from "../../store/actions/products";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
/* import HeaderButton from "../../components/UI/HeaderButton"; */

const SaleScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const categoryType = props.navigation.getParam("categoryType");
  const products = useSelector((state) => state.products.availableProducts).filter(function(item){
    return parseFloat(item.pricereal) <= (parseFloat(item.pricesale)*parseFloat(categoryType));
 }).map(function({id, ownerId, title, imageUrl, description, pricereal, pricesale, type}){
     return {id, ownerId, title, imageUrl, description, pricereal, pricesale, type};
 });
 const WIDTH = Dimensions.get('window').width;

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };


  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList 
    numColumns={2}
    //  contentContainerStyle={{alignSelf: 'flex-start'}}
    //   numColumns={2}
    // showsVerticalScrollIndicator={true}
    // showsHorizontalScrollIndicator={false}
      // onRefresh={loadProducts}
      // refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          pricereal={itemData.item.pricereal}
          pricesale={itemData.item.pricesale}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
           <View style={styles.actions}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          </View>
          {/* <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          /> */}
        </ProductItem>
      )}
    />
  );
};

SaleScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    // headerRight: () => (
    //   <TouchableOpacity
    //     onPress={() => {
    //       navData.navigation.navigate("Cart");
    //     }}
    //   >
    //     <Text style={styles.displayText}>Cart</Text>
    //   </TouchableOpacity>
    // ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-cart'
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Platform.OS === "android" ? "white" : Colors.primary,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SaleScreen;
