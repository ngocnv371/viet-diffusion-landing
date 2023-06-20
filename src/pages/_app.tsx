import { AppProps } from 'next/app';
import '../styles/main.css';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import { TailwindToaster } from '../components/toast';
import { AppConfig } from '../utils/AppConfig';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <Head>
      <title>{AppConfig.title}</title>
      <meta property="og:title" content={AppConfig.title} key="title" />
      <meta
        property="og:description"
        content={AppConfig.description}
        key="description"
      />
    </Head>
    <TailwindToaster />
    <Component {...pageProps} />
  </RecoilRoot>
);

export default MyApp;
