import React, {useState, useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import {Icon} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {setError} from "../../redux/actions/app";
import './search.scss';

/**
 * @param items {[]} - the items to make searchable and selectable
 * @param firstSearch {boolean} - whether the first search is completed
 * @param dispatch {function}
 * @desc A search bar component for selecting a type of breed.
 *
 * Features:
 *  - displays an option dialog on input focus
 *  - allow dialog search on Arrow keys (up & down)
 *  - allow option selection on click and Enter key
 */
function Search({setInputVal, handleOnKeyDown, firstSearch, dispatch}) {

    // CONSTANTS -------------------------------------------------------------------------------------------------------

    const INITIAL_PLACEHOLDER = "Search a subreddit";
    const inputRef = useRef(null);

    // COMPONENT STATE -------------------------------------------------------------------------------------------------

    const [placeholder, setPlaceholder] = useState(INITIAL_PLACEHOLDER);
    const [inputVal, setInputValLocal] = useState('');

    // ELEMENT REFS ----------------------------------------------------------------------------------------------------

    const searchContainerRef = useRef(null);

    // HANDLERS --------------------------------------------------------------------------------------------------------

    /**
     * @param e
     * @desc A change handler for updating
     * the appropriate states on input change.
     */
    const handleOnChange = e => {
        try {
            setInputVal(e.target.value);
            setInputValLocal(e.target.value);
            if (!e.target.value) setPlaceholder(INITIAL_PLACEHOLDER);
        } catch (err) {
            dispatch(setError(err));
        }
    };

    /**
     * @desc A click handler for clearing
     * the search bar.
     */
    const handleOnClick = () => {
        try {
            setInputValLocal('');
            inputRef.current.focus();
        } catch (err) {
            dispatch(setError(err));
        }
    };

    /**
     * @desc Renders a button to clear
     * the search container.
     */
    const renderCloseButton = () => {
        if (inputVal) {
            return (
                <span onClick={handleOnClick}>
                      <Icon className={"close-btn"} icon={IconNames.SMALL_CROSS}/>
                </span>
            );
        }
        return null;
    };

    return (
        <div
            className={"search-container"}
            style={{'width': (firstSearch ? '50%' : "80%")}}
            ref={searchContainerRef}>
            <Icon className="search-btn" icon={IconNames.SEARCH}/>
            {renderCloseButton()}
            <input
                type="text"
                value={inputVal}
                spellCheck={false}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                placeholder={placeholder}
                ref={inputRef}/>
        </div>
    );
}

Search.propTypes = {
    handleValueChange: PropTypes.func,
    firstSearch: PropTypes.bool,
    dispatch: PropTypes.func
};

export default Search;
