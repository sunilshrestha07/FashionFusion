import Document, { Html, Head, Main, NextScript } from 'next/document';
import { metadata } from '../app/metadata';

class MyDocument extends Document {
  render() {
    const title = typeof metadata.title === 'string' ? metadata.title : 'Default Title';
    const description = typeof metadata.description === 'string' ? metadata.description : 'Where elegance meets innovation. Discover your style with our curated collection of the latest trends, designed to inspire and empower your unique fashion journey.';
    const icon = typeof metadata.icons === 'string' ? metadata.icons : '../app/favicon.ico';


    return (
      <Html>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href={icon}/>

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={icon} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://fashion-fusion-sage.vercel.app/" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
