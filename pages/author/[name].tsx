import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {Time} from '../../components/Time';


interface Author {
  'id': string;
  'karma': number;
  'created': number;
  'submitted': number[];
};


/**
 * useRouter() can be used to access URL and query parameters. However,
 * it only works with functional components. For class-based components
 * there's a HOC withRouter, but I couldn't get it working with
 * TypeScript. It's totally plausible that this is due to my
 * inexperience in TypeScript. Next.js documentation mostly sidestep
 * this by recommending to use useRouter().
 */
export default () => {
  const authorName = useRouter().query.name;
  const [author, setAuthor] = useState<Author|null>(null);

  useEffect(() => {
    if (author !== null) {
      return;  // Information already loaded.
    }

    // We can't use async function directly with useEffect, since
    // a) async functions always implicitly return a Promise, and
    // b) useEffect treats any returned function as a clean-up function
    // that is called when the component unmounts.
    (async () => {
      const url = `https://hacker-news.firebaseio.com/v0/user/${authorName}.json`;
      const response = await fetch(url);
      const authorData = await response.json();
      setAuthor(authorData);
    })();
  });

  if (author === null) {
    return <>
      <section>
        <h2>Loading...</h2>
      </section>

      <Styles />
    </>;
  }

  return <>
    <section>
      <h2>{author.id}</h2>
      <dl>
        <dt>Registered:</dt>
        <dd>
          <Time timestamp={author.created} />
        </dd>
        <dt>Fake internet points:</dt>
        <dd>{author.karma}</dd>
        <dt>Submitted interactions:</dt>
        <dd>{author.submitted.length}</dd>
      </dl>
    </section>

    <Styles />
  </>;
};


const Styles = () => <style jsx>
  {`
    section { padding: 0.5rem 1rem; }

    h2 {
      margin: 0;
      font: normal 24px/1.5 sans-serif;
      color: #de9a07;
    }

    dl {
      font: normal 14px/1.5 sans-serif;
      color: #bf9a49;
      display: flex;
      flex-flow: row wrap;
      max-width: 400px;
    }
    dt { flex-basis: 40%; }
    dd {
      flex-basis: 60%;
      margin: 0;
    }
  `}
</style>;
