import {AppProps} from 'next/app';
import React from 'react';

import '../styles/global.css';


export default ({Component, pageProps}: AppProps) => <Component {...pageProps} />;
