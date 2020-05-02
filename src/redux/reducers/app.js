import {FETCH_POSTS, FETCH_TOPICS, APP, SEARCH_TOPICS} from "../actions/actionTypes";
import {cloneDeep} from 'lodash';

const INITIAL_STATE = {
    topics: [],
    posts: new Map(),
    isShowingPosts: false,
    currentTopic: null,
    inProgress: false,
    error: null,
    hasError: false
};

export default (prevState = INITIAL_STATE, action) => {
    let {posts} = prevState;
    switch(action.type) {
        case FETCH_POSTS.INITIAL:
        case FETCH_TOPICS.INITIAL:
        case SEARCH_TOPICS.INITIAL:
            return {
                ...prevState,
                error: null,
                inProgress: true,
                hasError: false
            };
        case FETCH_POSTS.SUCCESS:
            return {
                ...prevState,
                inProgress: false,
                posts: updatePosts(posts, action.topic, action.data)
            };
        case FETCH_TOPICS.SUCCESS:
        case SEARCH_TOPICS.SUCCESS:
            return {
                ...prevState,
                inProgress: false,
                topics: action.topics
            };
        case FETCH_POSTS.FAILURE:
        case FETCH_TOPICS.FAILURE:
        case SEARCH_TOPICS.FAILURE:
            return {
                ...prevState,
                inProgress: false,
                error: action.err,
                hasError: true
            };
        case APP.SET_ERROR:
            return {
                ...prevState,
                hasError: true,
                error: action.err
            };
        case APP.SET_SHOWING_POSTS:
            return {
                ...prevState,
                isShowingPosts: action.isShowingPosts
            };
        case APP.SET_CURRENT_TOPIC:
            return {
                ...prevState,
                currentTopic: action.topic
            };
        default:
            return prevState;
    }
}

function updatePosts(oldPosts,topic,data) {
    const newPosts = cloneDeep(oldPosts);
    newPosts.set(topic,data);
    return newPosts;
}