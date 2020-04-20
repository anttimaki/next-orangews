import React from 'react';
import Link from 'next/link';


/**
 * Next.js uses styled-jsx for component-scoped styles, and this is in
 * fact the way they recommend.
 * 
 * Since the header will be included on all the pages, we use it for
 * "global" styles too, hence two separate style elements. If the global
 * styles swell too big, it might make sense to move them to a separate
 * component.
 * 
 * Also worth noting, Next.js documentation says that global styles
 * apply to child elements of the current element, but quite obviously
 * they also affect the parent elements, e.g. body.
 */
export const Header = () => <header>
  <h1>Orange news site</h1>
  <Link href="/"><a>To frontpage</a></Link>

  <style jsx>
    {`
      header {
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
        color: #de9a07;
        font-family: sans-serif;
        background: linear-gradient(
          120deg,
          #000 0%,
          #de9a07 50%,
          #dfa423 100%
        );
      }
      
      h1 {
        margin: 0;
        text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
      }

      a {
        font-size: 0.8rem;
        color: #de9a07;
      }
    `}
  </style>

  <style jsx global>
    {`
      body {
        margin: 0;
        background-color: #333;
      }
    `}
  </style>
</header>;
