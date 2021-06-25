import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import FeedbackItem from "../../components/shop/FeedbackItem";
import * as feedbachsActions from "../../store/actions/feedbacks";

const FeedBackScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  var productId = props.navigation.getParam("productId");
  productId = productId.substring(productId.indexOf('-')+1);
  const userProfile = useSelector((state) => state.users.profileUsers.find((prod) => prod.id !== null));
  const feedbacks = useSelector((state) => state.feedbacks.feedbacks.filter((prod) => prod.productId === productId));
  const dispatch = useDispatch();

  const loadFeedbacks = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(feedbachsActions.fetchFeedbacks());
    } catch (err) {
      setError("TEST" + err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadFeedbacks
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadFeedbacks]);

  useEffect(() => {
    setIsLoading(true);
    loadFeedbacks().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadFeedbacks]);

  const editFeedbackHandler = (id,productId) => {
    props.navigation.navigate("AddFeedBack", { feedbackId: id, productId: productId });
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(billsActions.fetchBills()).then(() => {
  //     setIsLoading(false);
  //   });
  // }, [dispatch]);
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occuerd!</Text>
        <Button
          title="Try again"
          onPress={loadFeedbacks}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && feedbacks.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No feedback found</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadFeedbacks}
      refreshing={isRefreshing}
      data={feedbacks}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <FeedbackItem
          date={itemData.item.readableDate}
          title={itemData.item.title}
          realname={itemData.item.realname }
          onSelect={() => {
            editFeedbackHandler(itemData.item.id, productId);
          }}
        />
      )}
    />
  );
};

FeedBackScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "FEEDBACK OF PRODUCT",
    headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navData.navigation.navigate("AddFeedBack");
          }}
        >
          <Text style={styles.displayText}>Add</Text>
        </TouchableOpacity>
      ),
  };
};

const styles = StyleSheet.create({
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

export default FeedBackScreen;
