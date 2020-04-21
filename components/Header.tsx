import React from 'react';
import Head from 'next/head';
import Link from 'next/link';


// "Topbar" providing a link to the frontpage.
export const Header = () => <header>
  <Head>
    <title>Orange news</title>
  </Head>

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
</header>;
