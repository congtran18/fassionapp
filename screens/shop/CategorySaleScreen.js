import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList,TouchableOpacity, Text } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as productsActions from "../../store/actions/products";
import * as usersActions from "../../store/actions/users";
import CategorySale from '../../components/shop/CategorySale';
import { Sales } from '../../data/dummy-sale';


const CategorySaleScreen = (props) => {
  //load product khi ra lai trang category
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts(2));
    } catch (err) {
      setError("TEST" + err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  const loadedUsers = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(usersActions.fetchUsers());
    } catch (err) {
      setError("TEST" + err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts,
      loadedUsers
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts,loadedUsers]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
    loadedUsers().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts,loadedUsers]);
  const renderGridItem = itemData => {
    return (
      <CategorySale
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        onSelect={() => {
          // props.navigation.navigate({
          //   routeName: 'ProductsOverview',
          //   params: { categoryId: itemData.item.id },
          //   //categoryId: itemData.item.id,
            
          // });
          props.navigation.navigate("Sale", {
            categoryType: itemData.item.title,
            //productTitle: title,
          });
        }}
      />
      
    );
  };

  return (
    <FlatList data={Sales} renderItem={renderGridItem} numColumns={1} />
  );
};

CategorySaleScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'SALE',
    headerLeft: (
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
    // headerRight: () => ( 
    //   <TouchableOpacity
    //     onPress={() => {
    //       navData.navigation.navigate("Cart");
    //     }}
    //   >
    //     <Text style={styles.displayText}>Cart</Text>
    //   </TouchableOpacity>
    // ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategorySaleScreen;
