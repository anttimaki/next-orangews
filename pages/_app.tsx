import App, {AppProps} from 'next/app';
import Head from 'next/head';
import React, {createContext} from 'react';

import {Story, StoryCache} from '../types';
import {Header} from '../components/Header';
import '../styles/global.css';


export const CacheContext = createContext({
  'storyCache': {},
  'updateStoryCache': (stories: Story[]) => {}
});


interface State {
  'storyCache': StoryCache;
  'updateStoryCache': (stories: Story[]) => void;
};


export default class OrangeApp extends App<AppProps, {}, State> {
  constructor(props: AppProps) {
    super(props);

    // Update cache, but only if the given stories doesn't exist in it
    // yet. This is adequate since we don't invalidate cache anyway,
    // i.e. we never refresh stories from API once they're fetched.
    const updateStoryCache = (stories: Story[]) => {
      const storyCache = {...this.state.storyCache};

      // Object.keys will cast our keys to strings.
      const cachedIds = Object.keys(storyCache).map((id) => parseInt(id, 10));
      const newStories = stories.filter((s) => !cachedIds.includes(s.id));

      if (newStories.length) {
        newStories.forEach((s) => storyCache[s.id] = s);
        this.setState({storyCache});
      }
    };

    this.state = {
      'storyCache': {},
      updateStoryCache
    };
  }

  render() {
    return <CacheContext.Provider value={this.state}>
      <Head>
        <title>Orange news</title>
      </Head>
      <Header />
      <this.props.Component {...this.props.pageProps} />
    </CacheContext.Provider>;
  }
};
