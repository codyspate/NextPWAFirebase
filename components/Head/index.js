import React, { Component } from 'react'
import NextHead from 'next/head'

const defaultDescription = 'PWA App to share photo with the world'
const defaultOGURL = 'https://ecomerce-challenge.herokuapp.com/'
const defaultOGImage = 'https://ecomerce-challenge.herokuapp.com/static/icons/apple-icon-180x180.png'

export default class Head extends Component {
  render() {
    const { props } = this
    return (
      <React.Fragment>

        <NextHead>

          <meta charSet="UTF-8" />

          <title>{props.title || ''}</title>

          <meta name="description" content={props.description || defaultDescription} />

          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="icon" sizes="192x192" href="apple-icon-57x57.png" />

          <link rel="apple-touch-icon" href="apple-icon-57x57.png" />

          <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />

          <link rel="icon" href="/static/favicon.ico" />

          <meta property="og:url" content={props.url || defaultOGURL} />

          <meta property="og:title" content={props.title || ''} />

          <meta property="og:description" content={props.description || defaultDescription} />

          <meta name="twitter:site" content={props.url || defaultOGURL} />

          <meta name="twitter:card" content="summary_large_image" />

          <meta name="twitter:image" content={props.ogImage || defaultOGImage} />

          <meta property="og:image" content={props.ogImage || defaultOGImage} />

          <meta property="og:image:width" content="1200" />

          <meta property="og:image:height" content="630" />

          <link rel="manifest" href="static/manifest.json" />

          <meta name="apple-mobile-web-app-capable" content="yes" />

          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <meta name="apple-mobile-web-app-title" content="PWAGram" />

          <link rel="apple-touch-icon" href="static/icons/apple-icon-57x57.png" sizes="57x57" />

          <link rel="apple-touch-icon" href="static/icons/apple-icon-60x60.png" sizes="60x60" />

          <link rel="apple-touch-icon" href="static/icons/apple-icon-72x72.png" sizes="72x72" />

          <link rel="apple-touch-icon" href="static/icons/apple-icon-76x76.png" sizes="76x76" />

          <link rel="apple-touch-icon" href="static/icons/apple-icon-114x114.png" sizes="114x114" />

          <link rel="apple-touch-icon" href="static/icons/apple-icon-120x120.png" sizes="120x120" />

          <link rel="apple-touch-icon" href="static/icons/apple-icon-144x144.png" sizes="144x144" />

          <link rel="apple-touch-icon" href="static/icons/apple-icon-152x152.png" sizes="152x152" />

          <link rel="apple-touch-icon" href="static/icons/apple-icon-180x180.png" sizes="180x180" />

          <meta name="msapplication-TileImage" content="static/icons/app-icon-144x144.png" />

          <meta name="msapplication-TileColor" content="#fff" />

          <meta name="theme-color" content="#3f51b5" />

          <link href="https://fonts.googleapis.com/css?family=Raleway:400" rel="stylesheet" />

        </NextHead>

        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>

      </React.Fragment>
    )
  }
}
