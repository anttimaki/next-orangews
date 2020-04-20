import React from 'react';
import Link from 'next/link';

import {Story} from '../pages/index';
import {Time} from './Time';


export const StoryItem = (props: Story) => <li>
  <h2>
    {props.url
      ? <a href={props.url} target='_blank' rel='noopener'>{props.title}</a>
      : <span className='fake-link'>{props.title}</span>
    }
  </h2>

  <span className='by'>{'By'}</span>
  <Link href="/author/[name]/" as={`/author/${props.by}/`}>
    <a rel='author'>{props.by}</a>
  </Link>

  <span className='separator'>|</span>
  <span>{props.score} fake internet points</span>
  <span className='separator'>|</span>
  <Time timestamp={props.time} />

  <style jsx>
    {`
      li { padding: 1rem 2rem; }
      li:nth-of-type(2n) { background-color: #383838; }

      h2 {
        margin: 0;
        color: #de9a07;
      }

      h2 a,
      h2 .fake-link {
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

      .separator {
        margin: 0 0.5rem;
        color: #bf9a4966;
      }
    `}
  </style>
</li>;
