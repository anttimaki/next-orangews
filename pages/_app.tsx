import {AppProps} from 'next/app';
import Head from 'next/head';
import React from 'react';

import {Header} from '../components/Header';
import '../styles/global.css';


export default ({Component, pageProps}: AppProps) => <>
  <Head>
    <title>Orange news</title>
  </Head>
  <Header />
  <Component {...pageProps} />
</>;
