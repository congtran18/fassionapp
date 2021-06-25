import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const FeedbackItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.FeedbackItem}>
      <View style={styles.summary}>
        <Text style={styles.realname}>{props.realname}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {/* if showDetails is true then render this View */}
      {showDetails && (
        <View style={styles.detailItems}>
            <CartItem
              //key={props.id}
              //quantity={props.quantity}
              //amount={"   " + "$" + props.sum}
              title={props.title}
            />
            {/* <CartItem
              productPrice={"nguoi nhan" + " " +props.productPrice}
            /> */}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  FeedbackItem: {
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  touchable: {
    borderRadius: 15,
    overflow: "hidden",
  },
  realname: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default FeedbackItem;
