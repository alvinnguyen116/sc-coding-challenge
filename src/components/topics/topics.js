import React from 'react';
import {setCurrentTopic, setShowPosts} from "../../redux/actions/app";
import {prettifyTitle} from '../../util/util';
import './topics.scss';

/**
 * @param topics
 * @param dispatch
 * @param displayTitle {string} - title to display near top
 * @desc A non-connected component for displaying a list of topics.
 */
function Topics({topics, displayTitle, dispatch}) {

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    const topicElements = topics.map(data => <Topic data={data} key={data.name} dispatch={dispatch}/>);
    displayTitle = prettifyTitle(displayTitle);
    return (
        <>
            <h1>{displayTitle} Topics</h1>
            <div className={"topics"}>
              {topicElements}
            </div>
        </>
    );
}

/**
 * @param data
 * @param dispatch
 * @desc A helper component for displaying a single topic.
 *  Features:
 *  - renders a banner image if it exists
 *  - displays title
 *  - displays author icon and prefixed "r/<name>"
 */
function Topic({data, dispatch}) {

    // GLOBAL VARIABLES ------------------------------------------------------------------------------------------------

    const {display_name_prefixed, title, display_name} = data;

    // HANDLERS --------------------------------------------------------------------------------------------------------

    const handleClick = () => {
        dispatch(setCurrentTopic(display_name));
        dispatch(setShowPosts(true));
    };

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    /**
     * @param data
     * @desc If icon image exists, display it,
     * else, return null.
     */
    function renderIcon(data) {
        const {icon_img} = data;
        if (icon_img) {
            const style = {
                backgroundImage: `url(${icon_img})`
            };

            return (<div className={"topic-icon"} style={style}/>);
        }
        return null;
    }

    /**
     * @param data
     * @desc If the header or banner image exists,
     * display it, else return null.
     */
    function renderBanner(data) {
        const {banner_background_image, banner_background_color, header_img} = data;
        const style = {};
        if (header_img) { // select an image to display
            style.backgroundImage = `url(${header_img})`;
            style.backgroundSize = "contain";
        } else if (banner_background_image) {
            style.backgroundImage = `url(${banner_background_image})`;
            style.backgroundSize = "cover";
        }
        if (banner_background_color) { // update bg-color if it exists
            style.backgroundColor = banner_background_color;
        }
        return (<div className={"banner"} style={style}/>);
    }

    const icon = renderIcon(data);
    const banner = renderBanner(data);

    return (
        <div className={"topic"} onClick={handleClick}>
            {banner}
            <div className={"description"}>
                <div className={"title"}>{title}</div>
                <div className={"author"}>
                    {icon}
                    <div className={"display-name-prefixed"}>{display_name_prefixed}</div>
                </div>
            </div>
        </div>
    );
}

export default Topics;