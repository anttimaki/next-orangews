import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { CacheContext } from "../_app";
import { Author, Cache } from "../../types";
import { Time } from "../../components/Time";

/**
 * useRouter() can be used to access URL and query parameters. However,
 * it only works with functional components. For class-based components
 * there's a HOC withRouter, but I couldn't get it working with
 * TypeScript. It's totally plausible that this is due to my
 * inexperience in TypeScript. Next.js documentation mostly sidestep
 * this by recommending to use useRouter().
 */
export default () => {
  // Name has been typed as "string | string[]". My guess is that this
  // is supposed to accommodate multiple GET paramaters with the same
  // name. Take an extra step of confirming we have a string so we can
  // later use "authorName as string" to make TypeScript feel safe.
  let authorName = useRouter().query.name;
  authorName = Array.isArray(authorName) ? authorName[0] : authorName;

  const [author, setAuthor] = useState<Author | null>(null);
  const cache: Cache = useContext(CacheContext);

  useEffect(() => {
    if (author !== null) {
      return; // Information already loaded.
    }

    // We can't use async function directly with useEffect, since
    // a) async functions always implicitly return a Promise, and
    // b) useEffect treats any returned function as a clean-up function
    // that is called when the component unmounts.
    (async () => {
      let authorData;

      if (typeof cache.authorCache[authorName as string] === "undefined") {
        const url = `https://hacker-news.firebaseio.com/v0/user/${authorName}.json`;
        const response = await fetch(url);
        authorData = await response.json();

        // Ideally the cache would be updated as callback when the state
        // has been updated, but hook-state doesn't support this. It's
        // not likely to cause problems here, since the authors are
        // fetched one by one.
        cache.updateAuthorCache(authorData);
      } else {
        authorData = cache.authorCache[authorName as string];
      }

      setAuthor(authorData);
    })();
  });

  if (author === null) {
    return <h2 id="loading">Loading...</h2>;
  }

  return (
    <>
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

      <style jsx>
        {`
          section {
            padding: 0.5rem 1rem;
          }

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
          dt {
            flex-basis: 40%;
          }
          dd {
            flex-basis: 60%;
            margin: 0;
          }
        `}
      </style>
    </>
  );
};
