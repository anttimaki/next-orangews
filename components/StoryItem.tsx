import React from 'react';
import Link from 'next/link';

import {Story} from '../types';
import {Time} from './Time';


export const StoryItem = (props: Story) => <li>
  <h2>
    <a href={getUrl(props)} target='_blank' rel='noopener'>{props.title}</a>
  </h2>

  <span className='by'>{'By'}</span>
  <Link legacyBehavior href="/author/[name]/" as={`/author/${props.by}/`}>
    <a rel='author'>{props.by}</a>
  </Link>

  <Comments {...props} />

  <Separator />
  <span>{props.score} fake internet points</span>
  <Separator />
  <Time timestamp={props.time} />

  <style jsx global>
    {`
      li { padding: 1rem 2rem; }
      li:nth-of-type(2n) { background-color: #383838; }

      h2 {
        margin: 0;
        color: #de9a07;
      }

      h2 a {
        color: #de9a07;
        text-decoration: none;
        font: normal 1.2rem/1.5 sans-serif;
      }
      h2 a:hover { text-decoration: underline; }

      a,
      span {
        font: normal 0.8rem/1.5 sans-serif;
        color: #bf9a49;
      }

      .by { margin-right: 0.2rem; }
    `}
  </style>
</li>;


const Comments = (props: Story) => {
  // If story has no URL, the main link already points to comments.
  if (typeof props.url === 'undefined') {
    return null;
  }

  // Hack for getting correct URL from getUrl...
  const story_ = {...props};
  delete story_.url;

  return <>
    <Separator />
    <a href={getUrl(story_)} target='_blank' rel='noopener'>Comments</a>
  </>;
}


const Separator = () => <>
  <span>|</span>
  <style jsx>
    {`
      span {
        margin: 0 0.5rem;
        font: normal 0.8rem/1.5 sans-serif;
        color: #bf9a4966;
      }
    `}
  </style>
</>;


// "Ask HN" stories have no URL, point link to comments.
const getUrl = (story: Story) => typeof story.url === 'undefined'
  ? `https://news.ycombinator.com/item?id=${story.id}`
  : story.url;
