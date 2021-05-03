import Document, { Html, Head, Main, NextScript } from "next/document";
import { InitializeColorMode } from "theme-ui";

// global.Buffer = global.Buffer || require("buffer").Buffer;

// if (typeof btoa === "undefined") {
//   global.btoa = function (str) {
//     return Buffer.from(str).toString("base64");
//   };
// }

// if (typeof atob === "undefined") {
//   global.atob = function (b64Encoded) {
//     return Buffer.from(b64Encoded, "base64").toString();
//   };
// }

// if (typeof window === "undefined") {
//   global.window = {};
// }

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // Replace html lang attribute value with your language.
    const APIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    return (
      <Html>
        <Head>
          <script
            src="https://cdn.jsdelivr.net/npm/@toruslabs/torus-embed"
            crossOrigin="anonymous"
          />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${APIKEY}&libraries=places&v=weekly`}
            defer
          />
          <script src="/node_modules/quill-video-resize-module/video-resize.min.js" />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
