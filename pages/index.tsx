import fetch from 'isomorphic-unfetch';
import {NextPageContext} from 'next'
import React from 'react'

import {Header} from '../components/Header';
import {StoryList} from '../components/StoryList';


export interface Story {
  'by': string;
  'id': number;
  'score': number;
  'time': number;
  'title': string;
  'url': string;
};


interface Props {
  'stories': Story[];
};


// Define props with an interface and state as an empty object.
export default class Index extends React.Component<Props, {}> {
  /**
   * getInitialProps is next.js' preferred way of fetching required
   * information. Normally this would be done with componentDidMount (or
   * with useEffect, as I've done on author page for exercise's sake).
   * 
   * The benefit is that this way the initial data fetching and
   * rendering is done on the server. Later, if user navigates the pages
   * of the SPA, data is refressed on the browser. 
   */
  static async getInitialProps(ctx: NextPageContext) {
    const url = 'https://hacker-news.firebaseio.com/v0/beststories.json';
    const response = await fetch(url);
    const bestStories = await response.json();
    const itemsPerPage = 20;

    // Gather all the loadStory promises into an array so they are
    // executed in paraller.
    const loadingPromises = bestStories.slice(0, itemsPerPage).map(
      (storyId: number) => this.loadStory(storyId)
    );

    let stories: Story[];

    // Only proceed with execution once all promises have resolved.
    try {
      stories = await Promise.all(loadingPromises);
    } catch (err) {
      console.error(err);
      return [];
    }

    return {stories};
  }

  static async loadStory(id: number) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const response = await fetch(url);
    const story = await response.json();

    return story;
  }

  render() {
    return <>
      <Header />
      <StoryList stories={this.props.stories} />
    </>;
  }
};
