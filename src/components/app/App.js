import React, {useEffect, useState, useMemo} from 'react';
import {connect} from 'react-redux';
import {getTopics, getPosts, searchTopicsReducer, setShowPosts} from "../../redux/actions/app";
import ErrorBoundary from "../error-boundary/error-boundary";
import Topics from "../topics/topics";
import Posts from "../posts/posts";
import Search from '../search/search';
import './App.scss';

/**
 * @param appState
 * @param dispatch
 * @desc The top level app component.
 *  Main responsibilities:
 *  - displays posts or topics
 *  - displays error page
 */
function App({appState, dispatch}) {

  // GLOBAL VARIABLES --------------------------------------------------------------------------------------------------

  const {hasError, topics, currentTopic, isShowingPosts, posts} = appState;
  const [isPopularTopic, setIsPopularTopic] = useState(true);
  const [inputVal, setInputVal] = useState('');

  // SIDE EFFECTS ------------------------------------------------------------------------------------------------------

  /**
   * @desc Dispatch an action to the store
   * to obtain the (popular) topics once.
   */
  useEffect(() => {
    getTopicsLocal();
  }, []);

  /**
   * @desc Whenever current topic changes
   * and the topic is not in the posts map,
   * dispatch a get post action.
   */
  useEffect(() => {
    const wrapper = async() => {
      if (!posts.has(currentTopic)) {
        await dispatch(getPosts(currentTopic));
      }
      window.scrollTo(0,0);
    };
    wrapper().then();
  }, [currentTopic]);

  // COMPONENTS --------------------------------------------------------------------------------------------------------

  const renderTopicsOrPosts = () => {
    const displayTitle = isPopularTopic ? "Popular" : inputVal;
    if (isShowingPosts && currentTopic && posts.has(currentTopic)) {
      return (<Posts posts={posts.get(currentTopic)} topic={currentTopic} dispatch={dispatch}/>);
    }
    return (<Topics topics={topics} dispatch={dispatch} displayTitle={displayTitle}/>);
  };

  const getTopicsLocal = () => {
    dispatch(getTopics());
    setIsPopularTopic(true);
    dispatch(setShowPosts(false));
  };

  const searchTopicsReducerLocal = value => {
    dispatch(searchTopicsReducer(value));
    setIsPopularTopic(false);
    dispatch(setShowPosts(false));
  };

  /**
   * @desc Memoize the function so change in
   * inputVal doesn't trigger component change.
   */
  const memoizedRenderTopicsOrPosts = useMemo(renderTopicsOrPosts, [topics, posts, isShowingPosts]);

  const handleOnKeyDown = e => {
    const {keyCode} = e;
    try {
      const {value} = e.target;
      if (keyCode === 13) {
        if (value) {
          searchTopicsReducerLocal(value);
        } else {
          getTopicsLocal();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };


  const searchProps = {
    handleOnKeyDown,
    firstSearch: true,
    dispatch,
    setInputVal
  };

  return (
    <ErrorBoundary hasError={hasError} dispatch={dispatch}>
      <main className={"app"}>
        <Search {...searchProps} />
        {memoizedRenderTopicsOrPosts}
      </main>
    </ErrorBoundary>
  );
}

const mapStateToProps = state => ({
  appState: state.app
});

export default connect(mapStateToProps)(App);
