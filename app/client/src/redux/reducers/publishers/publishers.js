import * as actionsTypes from "../../actions/actionsTypes";

const initialState = {
  publishers: [],
  getPublishersLoading: false,
  publisher: {},
  publisherDetailsLoading: false,
  putPublisherLoading: false
};

// get publishers

const getPublishersStart = (state, action) => ({
  ...state,
  getPublishersLoading: true
});

const getPublishersSuccess = (state, action) => ({
  ...state,
  publishers: [...action.publishers],
  getPublishersLoading: false
});

const getPublishersFail = (state, action) => ({
  ...state,
  getPublishersLoading: false
});

// get publisher details

const getPublisherDetailsStart = (state, action) => ({
  ...state,
  publisherDetailsLoading: true
});

const getPublisherDetailsSuccess = (state, action) => ({
  ...state,
  publisher: { ...action.publisher },
  publisherDetailsLoading: false
});

const getPublisherDetailsFail = (state, action) => ({
  ...state,
  publisherDetailsLoading: false
});

// update publisher

const putPublishersStart = (state, action) => ({
  ...state,
  putPublisherLoading: true
});

const putPublishersSuccess = (state, action) => ({
  ...state,
  putPublisherLoading: false
});

const putPublishersFail = (state, action) => ({
  ...state,
  putPublisherLoading: false
});

// delete publisher

const deletePublisherStart = (state, action) => ({
  ...state
});

const deletePublisherSuccess = (state, action) => ({
  ...state,
  publishers: [...state.publishers.filter(publisher => publisher.id !== action.publisherId)]
});

const deletePublisherFail = (state, action) => ({
  ...state
});

//create publisher

const createPublisherStart = (state, action) => ({
  ...state
});

const createPublisherSuccess = (state, action) => ({
  ...state,
});

const createPublisherFail = (state, action) => ({
  ...state
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_PUBLISHERS_START:
      return getPublishersStart(state, action);
    case actionsTypes.GET_PUBLISHERS_SUCCESS:
      return getPublishersSuccess(state, action);
    case actionsTypes.GET_PUBLISHERS_FAIL:
      return getPublishersFail(state, action);
    case actionsTypes.GET_PUBLISHER_DETAILS_START:
      return getPublisherDetailsStart(state, action);
    case actionsTypes.GET_PUBLISHER_DETAILS_SUCCESS:
      return getPublisherDetailsSuccess(state, action);
    case actionsTypes.GET_PUBLISHER_DETAILS_FAIL:
      return getPublisherDetailsFail(state, action);
    case actionsTypes.PUT_PUBLISHER_START:
      return putPublishersStart(state, action);
    case actionsTypes.PUT_PUBLISHER_SUCCESS:
      return putPublishersSuccess(state, action);
    case actionsTypes.PUT_PUBLISHER_FAIL:
      return putPublishersFail(state, action);
    case actionsTypes.DELETE_PUBLISHER_START:
      return deletePublisherStart(state, action);
    case actionsTypes.DELETE_PUBLISHER_SUCCESS:
      return deletePublisherSuccess(state, action);
    case actionsTypes.DELETE_PUBLISHER_FAIL:
      return deletePublisherFail(state, action);
    case actionsTypes.CREATE_PUBLISHER_START:
      return createPublisherStart(state, action);
    case actionsTypes.CREATE_PUBLISHER_SUCCESS:
      return createPublisherSuccess(state, action);
    case actionsTypes.CREATE_PUBLISHER_FAIL:
      return createPublisherFail(state, action);
    default:
      return state;
  }
};

export default reducer;