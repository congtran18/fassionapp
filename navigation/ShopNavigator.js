import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";

import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import CategoriesScreen from "../screens/shop/CategoriesScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import BillsScreen from "../screens/user/BillsScreen";
import FeedBackScreen from "../screens/shop/FeedBackScreen";
import AddFeedBackScreen from "../screens/user/AddFeedBackScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import UserProfileScreen from "../screens/user/UserProfileScreen";
import EditUserScreen from "../screens/user/EditUserScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import CategorySaleScreen from "../screens/shop/CategorySaleScreen";
import SaleScreen from "../screens/shop/SaleScreen";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerBackTitleStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    FeedBack: FeedBackScreen,
    AddFeedBack: AddFeedBackScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const SaleNavigator = createStackNavigator(
  {
    CategorySale: CategorySaleScreen,
    Sale: SaleScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    userProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ProfileNavigator = createStackNavigator(
  {
    userProfile: UserProfileScreen,
    editUser: EditUserScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const BillNavigator = createStackNavigator(
  {
    Bills: BillsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
    Profile: ProfileNavigator,
    Bill: BillNavigator,
    Sale: SaleNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#c6cbef' }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
