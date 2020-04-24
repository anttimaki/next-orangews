import App, {AppProps} from 'next/app';
import Head from 'next/head';
import React, {createContext} from 'react';

import {Author, Cache, Story} from '../types';
import {Header} from '../components/Header';
import '../styles/global.css';


export const CacheContext = createContext({
  'authorCache': {},
  'storyCache': {},
  'updateAuthorCache': (author: Author) => {},
  'updateStoryCache': (stories: Story[]) => {}
});


/**
 * Regular components have a signature of Component<Props, State>.
 * App however has a signature of App<P = {}, CP = {}, S = {}>, where
 * P and S correspond to Props and State, but CP is a kind of mystery.
 *
 * The state is defined as Cache in types since it's used in multiple
 * places within the project.
 */
export default class OrangeApp extends App<AppProps, {}, Cache> {
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

    const updateAuthorCache = (author: Author) => {
      if (typeof this.state.authorCache[author.id] === 'undefined') {
        const authorCache = {...this.state.authorCache};
        authorCache[author.id] = author;
        this.setState({authorCache});
      }
    };

    this.state = {
      'authorCache': {},
      'storyCache': {},
      updateAuthorCache,
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
