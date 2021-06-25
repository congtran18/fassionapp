import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as feedbachsActions from "../../store/actions/feedbacks";
import Colors from "../../constants/Colors";
import Input from "../../components/UI/Input";
import * as usersActions from "../../store/actions/users";


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

const AddFeedBackScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const productId = props.navigation.getParam("productId");
  const userProfile = useSelector((state) => state.users.profileUsers.find((prod) => prod.id !== null));

//   const prodId = props.navigation.getParam("productId");
const prodId = props.navigation.getParam("feedbackId");
  const editedFeedback = useSelector((state) =>
    state.feedbacks.userfeedbacks.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedFeedback ? editedFeedback.title : "",
      review: editedFeedback ? editedFeedback.review : "",
    },
    inputValidities: {
      title: editedFeedback ? true : false,
      review: editedFeedback ? true : false,
    },
    formIsValid: editedFeedback ? true : false,
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
      if (editedFeedback) {
        await dispatch(
          feedbachsActions.addFeedback(
            prodId,
            productId,
            userProfile.realname,
            formState.inputValues.title,
            formState.inputValues.review,
            userProfile.ownerId,
          )
        );
      } else {
        await dispatch(
            feedbachsActions.addFeedback(
            productId,
            userProfile.realname,
            formState.inputValues.title,
            formState.inputValues.review,
            userProfile.ownerId,
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
    <View style={styles.displayText}>
    <Text>{productId}</Text>
      </View>
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
            initialValue={editedFeedback ? editedFeedback.title : ""}
            initiallyValid={!!editedFeedback}
            required
          />
          <Input
            id="review"
            label="Review"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedFeedback ? editedFeedback.review : ""}
            initiallyValid={!!editedFeedback}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AddFeedBackScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Feedback"
      : "Add Feedback",
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

export default AddFeedBackScreen;
