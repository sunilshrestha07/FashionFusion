import Document, { Html, Head, Main, NextScript } from 'next/document';


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
          <link rel="icon" type="image/svg+xml" href="@/public/next.svg" />
          <meta property="og:description" content={description} />
          <meta property="og:image" content="@/public/vercel.svg" /> {/* Replace with actual image URL */}
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://fashion-fusion-sage.vercel.app/" /> {/* Replace with actual website URL */}
          

          {/* Favicon */}
          <link rel="icon" href="../favicon.ico" /> {/* Replace with actual favicon path */}
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
