import Feedback from "../../models/feedback";

export const ADD_FEEDBACK = "ADD_FEEDBACK";
export const SET_FEEDBACKS = "SET_FEEDBACKS";

export const fetchFeedbacks = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const respone = await fetch(
        `https://appfasion-default-rtdb.firebaseio.com/feedbacks.json`
      );

      if (!respone.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await respone.json();
      const loadedFeedbacks = [];
      for (const key in resData) {
        loadedFeedbacks.push(
          new Feedback(
            key,
            resData[key].realname,
            resData[key].title,
            resData[key].review,
            resData[key].ownerId,
            resData[key].productId,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_FEEDBACKS, feedbacks: loadedFeedbacks.reverse(), userfeedbacks: loadedFeedbacks.filter((prod) => prod.ownerId === userId)  });
    } catch (err) {
      throw err;
    }
  };
};

export const addFeedback = (productId, realname, title) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const respone = await fetch(
      `https://appfasion-default-rtdb.firebaseio.com/feedbacks.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          realname,
          title,
          review,
          ownerId: userId,
          productId,
          date: date.toISOString(),
        }),
      }
    );

    if (!respone.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await respone.json();

    dispatch({
      type: ADD_FEEDBACK,
      feedbackData: {
        id: resData.name,
        realname: realname,
        title: title,
        review: review,
        ownerId: userId,
        productId : productId,
        date: date,
      },
    });
  };
};
