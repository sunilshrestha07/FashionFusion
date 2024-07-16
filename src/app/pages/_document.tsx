// pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { metadata } from '../metadata';

const description = "Where elegance meets innovation. Discover your style with our curated collection of the latest trends, designed to inspire and empower your unique fashion journey.";
const keywords = "FashionFusion, fashion, fashion trends, fashion style, fashion inspiration, fashion blog, fashion store, fashion ecommerce, suneelshrestha, suneel, sunil";
const title = "FashionFusion";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Meta tags */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          
          {/* Open Graph tags */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content="https://example.com/your-image.jpg" /> {/* Replace with actual image URL */}
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yourwebsite.com" /> {/* Replace with actual website URL */}
          
          {/* Twitter meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@yourtwitterhandle" /> {/* Replace with actual Twitter handle */}
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content="https://example.com/your-image.jpg" /> {/* Replace with actual image URL */}

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" /> {/* Replace with actual favicon path */}
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
