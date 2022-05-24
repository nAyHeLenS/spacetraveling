import { PrismicPreview } from '@prismicio/next';
import { AppProps } from 'next/app';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PrismicPreview>
        <Component {...pageProps} />
    </PrismicPreview>
  );
}

export default MyApp;
