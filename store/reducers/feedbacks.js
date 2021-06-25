import { ADD_FEEDBACK, SET_FEEDBACKS } from "../actions/feedbacks";
import Feedback from "../../models/feedback";

const initialState = {
    feedbacks: [],
    userfeedbacks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FEEDBACKS:
      return {
        feedbacks: action.feedbacks,
        userfeedbacks: action.userfeedbacks,
      };
    case ADD_FEEDBACK:
      const newFeedback = new Feedback(
        action.feedbackData.id,
        action.feedbackData.realname,
        action.feedbackData.title,
        action.feedbackData.review,
        action.feedbackData.ownerId,
        action.feedbackData.productId,
        action.feedbackData.date,
      );
      return {
        ...state,
        feedbacks: state.feedbacks.concat(newFeedback),
        userfeedbacks: state.userfeedbacks.concat(newFeedback),
      };
  }
  return state;
};
