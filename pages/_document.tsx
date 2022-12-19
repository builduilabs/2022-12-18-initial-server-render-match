import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  if (window.innerWidth > 768) {
                    document.documentElement.classList.add("initial-viewport-desktop");
                  } else {
                    document.documentElement.classList.add("initial-viewport-mobile");
                  }
                } catch (err) {}
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
