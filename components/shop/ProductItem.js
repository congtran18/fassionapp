import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from "react-native";

import Card from "../UI/Card";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const WIDTH = Dimensions.get('window').width;
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.pricereal}>${parseFloat(props.pricereal).toFixed(2)}</Text>
              <Text style={styles.pricesale}>{parseFloat(props.pricesale).toFixed(2)>0 ? parseFloat(props.pricesale).toFixed(2): ""}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 400,
    width: '45%',
    marginLeft: 10,
    marginTop:5,
    marginRight:10,
  },
  touchable: {
    borderRadius: 15,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  details: {
    alignItems: "center",
    height: "15%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 1,
    textAlign: "center",
  },
  pricereal: {
    fontSize: 18,
    color: "#888",
    marginVertical: 2,
    fontWeight: "bold",
  },
  pricesale:{
    fontSize: 18,
    color: "#888",
    marginVertical: 2,
    fontWeight: "bold",
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 18,
  },
});

export default ProductItem;
