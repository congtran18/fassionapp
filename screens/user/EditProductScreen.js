import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";
import Input from "../../components/UI/Input";
import {Picker} from "@react-native-picker/picker";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam("productId");
  // var prodId2 = prodId.substring(prodId.indexOf('-')+1);
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();
  const [Enable , setEnable]  = useState("T-shirt");

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      pricereal: editedProduct ? editedProduct.pricereal : "",
      pricesale: editedProduct ? editedProduct.pricesale : "",
      type: editedProduct ? editedProduct.type : "",
      tinhtrang: editedProduct ? editedProduct.tinhtrang : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      pricereal: editedProduct ? true : false,
      pricesale: editedProduct ? true : false,
      type: editedProduct ? true : false,
      tinhtrang: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error[{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    /* if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", {
        text: "Okay",
      });
      return;
    } */
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            formState.inputValues.pricereal,
            formState.inputValues.pricesale,
            formState.inputValues.type,
            formState.inputValues.tinhtrang,
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            formState.inputValues.pricereal,
            formState.inputValues.pricesale,
            formState.inputValues.type,
            formState.inputValues.tinhtrang,
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="pricereal"
            label="Price Real"
            errorText="Please enter a valid price!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.pricereal : ""}
            required
            min={0.1}
          />
          <Input
            id="pricesale"
            label="Price Sale"
            errorText="Please enter a valid price!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.pricesale : ""}
            min={0.1}
          />
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
          <Input
            id="type"
            label="Type"
            errorText="Please enter a valid type!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.type : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="tinhtrang"
            label="Tinhtrang"
            errorText="Please enter a valid type!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? "ok" : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {/* <Picker
          id="type"
          selectedValue={editedProduct ? editedProduct.type : Enable}
          style={{ height: 50, width: 250 }}
          mode={"dialog"}
          onValueChange={(itemValue) => setEnable(itemValue)}
          >
          <Picker.Item label="T-shirt" value="T-shirt" />
          <Picker.Item label="jeans" value="jeans" />
          <Picker.Item label="Kaki pant" value="Kaki pant" />
          <Picker.Item label="short pant" value="short pant" />
          <Picker.Item label="jacket" value="jacket" />
          <Picker.Item label="vest" value="vest" />
          </Picker> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <TouchableOpacity onPress={submitFn}>
        <Text style={styles.displayText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
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

export default EditProductScreen;
