import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getTopics, getPosts} from "../../redux/actions/app";
import ErrorBoundary from "../error-boundary/error-boundary";
import Topics from "../topics/topics";
import Posts from "../posts/posts";
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

  // SIDE EFFECTS ------------------------------------------------------------------------------------------------------

  /**
   * @desc Dispatch an action to the store
   * to obtain the topics once.
   */
  useEffect(() => {
    dispatch(getTopics());
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
    if (isShowingPosts && currentTopic && posts.has(currentTopic)) {
      return (<Posts posts={posts.get(currentTopic)} topic={currentTopic} dispatch={dispatch}/>);
    }
    return (<Topics topics={topics} dispatch={dispatch}/>);
  };

  return (
    <ErrorBoundary hasError={hasError} dispatch={dispatch}>
      <main className={"app"}>
        {renderTopicsOrPosts()}
      </main>
    </ErrorBoundary>
  );
}

const mapStateToProps = state => ({
  appState: state.app
});

export default connect(mapStateToProps)(App);
