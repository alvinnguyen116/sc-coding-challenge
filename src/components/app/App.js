import React, {useEffect, useState, useMemo} from 'react';
import {connect} from 'react-redux';
import {getTopics, getPosts, searchTopicsReducer} from "../../redux/actions/app";
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
    dispatch(getTopics()); // popular topics
    setIsPopularTopic(true);
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

  const memoizedRenderTopicsOrPosts = useMemo(renderTopicsOrPosts, [topics, posts]);

  const handleOnKeyDown = e => {
    const {keyCode} = e;
    console.log("handleonkeydown");
    try {
      const {value} = e.target;
      if (keyCode === 13) {
        console.log("Enter");
        if (value) {
          dispatch(searchTopicsReducer(value));
          setIsPopularTopic(false);
        } else {
          dispatch(getTopics());
          setIsPopularTopic(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };


  const searchProps = {
    handleOnKeyDown,
    handleValueChange: console.log,
    handleOnFocus: console.log,
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
