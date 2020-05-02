import React from 'react';
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {setShowPosts} from "../../redux/actions/app";
import {formatDateDiff, prettifyTitle} from "../../util/util";
import './posts.scss';

/**
 * @param posts
 * @param topic
 * @param dispatch
 * @desc A wrapper component for a list of posts.
 */
function Posts({posts, topic, dispatch}) {
    window.scrollTo(0,0);

    // GLOBAL VARIABLES ------------------------------------------------------------------------------------------------

    const postElements = posts.map(post => <Post data={post} key={post.name}/>);

    // HANDLERS --------------------------------------------------------------------------------------------------------

    const handleClick = async () => {
      await dispatch(setShowPosts(false));
      window.scrollTo(0,0);
    };

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    return (
        <>
            <h1>{prettifyTitle(topic)}</h1>
            <div className={'posts'}>
                <nav>
                    <span className={`back-icon`} onClick={handleClick}>
                       <Icon icon={IconNames.CHEVRON_LEFT}/>
                    </span>
                </nav>
                {postElements}
            </div>
        </>
    );
}

/**
 * @param data
 * @desc A helper component for displaying a single post.
 * Features:
 *  - displays thumbnail if it exists
 *  - displays title, author, and time since post was created
 *  - displays amount of "ups"
 */
function Post({data}) {

    // GLOBAL VARIABLES ------------------------------------------------------------------------------------------------

    const {title, url, created, author, ups} = data;
    const timeAgo = formatDateDiff(created*1000, +(new Date()));

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    function renderThumbnail(data) {
        const {thumbnail} = data;
        if (thumbnail && RegExp('http*', 'gi').test(thumbnail)) {
            return (<div className={'thumbnail'} style={{backgroundImage: `url(${thumbnail})`}}/>);
        }
        return null;
    }

    const thumbnail = renderThumbnail(data);
    return (
        <a href={url} target={'_blank'}>
            <div className={"post"}>
                {thumbnail}
                <div className={"text"}>
                    <h1 className={"title"}>{title}</h1>
                    <div className={"user-metadata"}>
                        {`Posted by ${author} ${timeAgo} ago`}
                    </div>
                    <div className={"ups"}>
                        <Icon icon={IconNames.THUMBS_UP}/>
                        <div className={"amount"}>
                            {ups.toLocaleString() || 0}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default Posts;