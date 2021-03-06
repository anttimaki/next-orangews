import React from 'react'

import {CacheContext} from './_app';
import {Story} from '../types';
import {StoryList} from '../components/StoryList';
import {Button} from '../components/Button';


interface State {
  loadingMore: boolean;
  visibleBlocks: number;
  visibleStories: Story[];
};


// Define props as an empty object and state with an interface.
export default class Index extends React.Component<{}, State> {
  static contextType = CacheContext

  constructor(props: any) {
    super(props);

    this.state = {
      'loadingMore': false,
      'visibleBlocks': 1,
      'visibleStories': []
    };

    this.showMore = this.showMore.bind(this);
    this.getMoreStories = this.getMoreStories.bind(this);
  }

  /**
   * getInitialProps is next.js' preferred way of fetching required
   * information. Normally this would be done with componentDidMount (or
   * with useEffect, as I've done on author page for exercise's sake).
   *
   * The benefit is that this way the initial data fetching and
   * rendering is done on the server. Later, if user navigates the pages
   * of the SPA, data is refressed on the browser.
   *
   * Unfortunately, this won't work when we want to store the fetched
   * items in a cache, since the method must be static and thus has no
   * access to state/context (or at least I found no way how to achieve
   * this).
   *
   * I'll leave this dead code here anyway since it nicely documents how
   * getInitialProps should be used.
   *
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
  */

  async loadStories() {
    const url = 'https://hacker-news.firebaseio.com/v0/beststories.json';
    const response = await fetch(url);
    const bestStories = await response.json();
    const itemsPerBlock = 20;
    const lastIndex = this.state.visibleBlocks * itemsPerBlock;
    const firstIndex = lastIndex - itemsPerBlock;

    // Gather all the loadStory promises into an array so they are
    // executed in paraller.
    const loadingPromises = bestStories.slice(firstIndex, lastIndex).map(
      (storyId: number) => {
        const cached = this.context.storyCache[storyId];
        return typeof cached === 'undefined' ?  this.loadStory(storyId) : cached;
      }
    );

    let stories: Story[];

    // Only proceed with execution once all promises have resolved.
    try {
      stories = await Promise.all(loadingPromises);
    } catch (err) {
      console.error(err);
      return [];
    }

    return stories;
  }

  async loadStory(id: number) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const response = await fetch(url);
    const story = await response.json();

    return story;
  }

  // Load more stories from API and update them to local Component state
  // and application level cache.
  async getMoreStories() {
    const stories = await this.loadStories();

    this.setState(
      {'loadingMore': false, 'visibleStories': stories},
      this.context.updateStoryCache(stories)
    );
  }

  showMore() {
    const state = {
      'loadingMore': true,
      'visibleBlocks': this.state.visibleBlocks + 1
    };

    this.setState(state, this.getMoreStories);
  }

  componentDidMount() {
    this.getMoreStories();
  }

  render() {
    if (!this.state.visibleStories.length) {
      return <h2 id='loading'>Loading...</h2>;
    }

    return <>
      <StoryList stories={this.state.visibleStories} />
      <Button onClick={this.showMore} loading={this.state.loadingMore}>
        Show more
      </Button>
    </>;
  }
};
