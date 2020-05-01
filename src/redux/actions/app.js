import {FETCH_POSTS, FETCH_TOPICS, APP, SEARCH_TOPICS} from "./actionTypes";
import {fetchPosts, fetchTopics, searchTopics} from "../../api";

function fetchPostInitial() {
    return {
        type: FETCH_POSTS.INITIAL
    };
}

function fetchPostSuccess(topic,data) {
    data = data.data.children.map(child => child.data);
    return {
        type: FETCH_POSTS.SUCCESS,
        topic,
        data
    };
}

function fetchPostFailure(err) {
    return {
        type: FETCH_POSTS.FAILURE,
        err
    };
}

function fetchTopicInitial() {
    return {
        type: FETCH_TOPICS.INITIAL
    };
}

function fetchTopicSuccess(data) {
    const topics = data.data.children.map(child => child.data);
    return {
        type: FETCH_TOPICS.SUCCESS,
        topics
    };
}

function fetchTopicFailure(err) {
    return {
        type: FETCH_TOPICS.FAILURE,
        err
    };
}

function searchTopicInitial() {
    return {
        type: SEARCH_TOPICS.INITIAL
    };
}

function searchTopicSuccess(data) {
    const topics = data.data.children.map(child => child.data);
    return {
        type: SEARCH_TOPICS.SUCCESS,
        topics
    };
}

function searchTopicFailure(err) {
    return {
        type: SEARCH_TOPICS.FAILURE,
        err
    };
}

export function setError(err) {
    return {
        type: APP.SET_ERROR,
        err
    }
}

export function setShowPosts(isShowingPosts) {
    return {
        type: APP.SET_SHOWING_POSTS,
        isShowingPosts
    }
}

export function setCurrentTopic(topic) {
    return {
        type: APP.SET_CURRENT_TOPIC,
        topic
    }
}

export function getTopics() {
    return async (dispatch) => {
        dispatch(fetchTopicInitial());
        try {
            const res = await fetchTopics();
            dispatch(fetchTopicSuccess(res));
        } catch (e) {
            dispatch(fetchTopicFailure(e));
        }
    };
}

/**
 * @param topic
 * @returns {function(...[*]=)}
 */
export function getPosts(topic) {
    return async (dispatch) => {
        dispatch(fetchPostInitial());
        try {
            const data = await fetchPosts(topic);
            dispatch(fetchPostSuccess(topic, data));
        } catch (e) {
            dispatch(fetchPostFailure(e));
        }
    };
}

export function searchTopicsReducer(input) {
    return async (dispatch) => {
        dispatch(searchTopicInitial());
        try {
            const res = await searchTopics(input);
            dispatch(searchTopicSuccess(res));
        } catch (e) {
            dispatch(searchTopicFailure(e));
        }
    };
}
