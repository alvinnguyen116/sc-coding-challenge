# Service Channel Coding Challenge 
This is my response to a coding challenge by [Service Channel](https://servicechannel.com/).

Check out the [live demo](https://alvinnguyen116.github.io/sc-coding-challenge/). 

## Installation
Clone the repo and install the node modules through npm or yarn. 
 
```bash
npm install 
```

Start the application using the "start" script from package.json 
```bash 
npm run start 
```

## Requirements 
Base Requirements

 - Create a single page application using react that lets you browse through [reddit](https://www.reddit.com/)
    - To get a list of subreddits you can use the [popular endpoint](https://www.reddit.com/subreddits/popular.json?raw_json=1)
    - To get a list of posts for a subreddit you can use the [posts endpoint](https://www.reddit.com/r/politics/hot.json)
 - There should be a panel where you can see the details of a selected post 
  (post title, author, image/preview if there is any, text if there is any)

 - There should be a list of posts from a selected subreddit

   - Every list item should have ‘active styling’ if its selected and another if its hovered

 - There should be a list of subreddits 

 - Every list item should have ‘active styling’ if its selected and another if its hovered
  
 Round #2: 
 
 - implement a search bar (w/o autocomplete) that replaces the 
 of popular subreddits. If the search bar is empty, display the popular 
 list by default. 
 
 - Make the title change based on Popular vs Search subreddits 
 
  
Submission Requirements

 - Application should be written in React, (redux optional) 

 - A single installation step is fine (e.g needing to run npm install before further commands)

 - Should be viewable in at least one of the following ways:

 - drag and droppable html file, bundled JS, and source js

 - Server that can be run in one line (e.g webpack dev server or node server)

 - Deployed to a server (e.g github pages) along with a link to the source files
 
## My Approach 
 - I was told to finish this project within 2-4 hours. I finished the main features in 5-6 hours 
 and spent about an hour documenting and deploying. 
 To speed up my development, I took a lot of 'inspiration' from a 
 [previous coding challenge](https://alvinnguyen116.github.io/jobox-coding-challenge/) of mine.  
 
 - I couldn't really find a plaintext description in either endpoints. All I could find was markdown text 
 under the property name "selftext". There was no good way to covert this into a succinct description, so I opted 
 to not display descriptions. 
 
 - I implemented box-shadow and scaling on hover.
 
 - I opted not to do styling on selection. Because of the way I built the app, selection simply 
 takes the user to the desired page. 
 
 - I spent a lot of time trying to figure out which property to use from the objects returned by the endpoints. 
 I didn't really find the [documentation on Reddit API](https://www.reddit.com/dev/api/) helpful, so I just inspected 
 each object manually to find what I needed. 
 
 Round #2 
 
 - Since I only had an hour, I took a search bar from a [previous project](https://alvinnguyen116.github.io/jobox-coding-challenge/) to save
 time on CSS and layout. 
 
 - Since my computer is slow, I wrote most of the code blindly (without checking locally). In order, 
 I added the new endpoint inside of api.js, added new actions and thunks 
, and finally created a local boolean whether to show popular topics.

## Contributions 
 I'm always open for suggestions and improvements.
 
 Feel free to create a [pull request](https://github.com/alvinnguyen116/sc-coding-challenge/pulls) 
 or submit an [issue](https://github.com/alvinnguyen116/sc-coding-challenge/issues).

 
 
