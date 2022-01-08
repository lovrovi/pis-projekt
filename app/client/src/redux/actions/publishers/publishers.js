import * as actionsTypes from "../actionsTypes"
import axios from "../../../axios"

export const getPublishersStart = () => {
    return {
        type: actionsTypes.GET_PUBLISHERS_START
    };
};
export const getPublishersSuccess = (publishers) => {
    return {
        type: actionsTypes.GET_PUBLISHERS_SUCCESS,
        publishers
    };
};
export const getPublishersFail = () => {
    return {
        type: actionsTypes.GET_PUBLISHERS_FAIL
    };
};

export const getPublishers = (search = "") => {
    return async (dispatch) => {
        // send request
        dispatch(getPublishersStart());
        search = encodeURIComponent(search);
        axios({
            method: "GET",
            url: "/publishers",
            params: {
                search
            },
        })
            .then((data) => {
                console.log("getPublishers:", data);
                dispatch(getPublishersSuccess(data.data));

            })
            .catch((e) => {
                console.error(e);
                dispatch(getPublishersFail());
            });
    };
};

export const getPublisherDetailsStart = () => {
    return {
        type: actionsTypes.GET_PUBLISHER_DETAILS_START
    };
};
export const getPublisherDetailsSuccess = (publisher) => {
    return {
        type: actionsTypes.GET_PUBLISHER_DETAILS_SUCCESS,
        publisher
    };
};
export const getPublisherDetailsFail = () => {
    return {
        type: actionsTypes.GET_PUBLISHER_DETAILS_FAIL
    };
};

export const getPublisherDetails = (id) => {
    return async (dispatch) => {
        // send request
        dispatch(getPublisherDetailsStart());

        axios({
            method: "GET",
            url: `/publishers/${id}`
        })
            .then((data) => {
                console.log("getPublisherDetails:", data);
                dispatch(getPublisherDetailsSuccess(data.data));

            })
            .catch((e) => {
                console.error(e);
                dispatch(getPublisherDetailsFail());
            });
    };
};

export const putPublisherStart = () => {
    return {
        type: actionsTypes.PUT_PUBLISHER_START
    };
};
export const putPublisherSuccess = () => {
    return {
        type: actionsTypes.PUT_PUBLISHER_SUCCESS
    };
};
export const putPublisherFail = () => {
    return {
        type: actionsTypes.PUT_PUBLISHER_FAIL
    };
};

export const putPublisher = (publisherObj) => {
    return async (dispatch) => {
        // send request
        const publisher = {
            id: publisherObj.id,
            name: publisherObj.name,
            address: {
                road: publisherObj.road,
                zipCode: publisherObj.zipCode,
                city: publisherObj.city,
                country: publisherObj.country
            }
        }

        dispatch(putPublisherStart());

        axios({
            method: "PUT",
            url: `/publishers/${publisherObj.id}`,
            data: publisher
        })
            .then((data) => {
                console.log("putPublisher:", data);
                dispatch(putPublisherSuccess());
                dispatch(getPublishers())
            })
            .catch((e) => {
                console.error(e);
                dispatch(putPublisherFail());
            });
    };
};

export const deletePublisherStart = () => {
    return {
        type: actionsTypes.DELETE_PUBLISHER_START
    };
};
export const deletePublisherSuccess = (publisherId) => {
    return {
        type: actionsTypes.DELETE_PUBLISHER_SUCCESS,
        publisherId
    };
};
export const deletePublisherFail = () => {
    return {
        type: actionsTypes.DELETE_PUBLISHER_FAIL
    };
};

export const deletePublisher = (id) => {
    return async (dispatch) => {
        // send request
        dispatch(deletePublisherStart());

        axios({
            method: "DELETE",
            url: `/publishers/${id}`
        })
            .then((data) => {
                console.log("deletePublisher:", data);
                dispatch(deletePublisherSuccess(id));
                dispatch(getPublishers())
            })
            .catch((e) => {
                console.error(e);
                dispatch(deletePublisherFail());
            });
    };
};

export const createPublisherStart = () => {
    return {
        type: actionsTypes.CREATE_PUBLISHER_START
    };
};
export const createPublisherSuccess = (publisherId) => {
    return {
        type: actionsTypes.CREATE_PUBLISHER_SUCCESS,
        publisherId
    };
};
export const createPublisherFail = () => {
    return {
        type: actionsTypes.CREATE_PUBLISHER_FAIL
    };
};

export const createPublisher = (publisherObj) => {
    return async (dispatch) => {
        // send request
        dispatch(createPublisherStart());
        const publisher = {
            id: publisherObj.id,
            name: publisherObj.name,
            address: {
                road: publisherObj.road,
                zipCode: publisherObj.zipCode,
                city: publisherObj.city,
                country: publisherObj.country
            }
        }

        axios({
            method: "POST",
            url: "/publishers",
            data: publisher
        })
            .then((data) => {
                console.log("createPublisher:", data);
                dispatch(createPublisherSuccess());
                dispatch(getPublishers())
            })
            .catch((e) => {
                console.error(e);
                dispatch(createPublisherFail());
            });
    };
};
