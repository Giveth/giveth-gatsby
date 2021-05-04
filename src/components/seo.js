/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'

const DEFAULT_SEO_IMAGE = 'https://i.imgur.com/uPFEgJu.png'

function Seo({ description, lang, meta, title, image }) {
  // const { site } = useStaticQuery(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           title
  //           description
  //           author
  //         }
  //       }
  //     }
  //   `
  // )
  const metaDescription = description
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
  let metaImage = image
  if (base64Regex.test(image?.split(',')[1])) {
    // it's base64, convert >>> this doesnt work
    // metaImage = `decoder.php?data=${image}`
    metaImage = DEFAULT_SEO_IMAGE
  } else if (/^\d+$/.test(metaImage) || !image) {
    // it's a number or nothing
    metaImage = DEFAULT_SEO_IMAGE
  }
  // console.log({ metaImage })
  return (
    <NextSeo
      title={title}
      description={metaDescription}
      canonical='https://www.giveth.io/'
      titleTemplate={`%s | Giveth`}
      openGraph={{
        url: 'https://www.giveth.io/',
        title: title,
        description: metaDescription,
        images: [
          {
            url: metaImage,
            width: 800,
            height: 600,
            alt: 'Og Image Alt'
          }
          // {
          //   url: 'https://www.example.ie/og-image-02.jpg',
          //   width: 900,
          //   height: 800,
          //   alt: 'Og Image Alt Second',
          // // },
          // { url: 'https://www.example.ie/og-image-03.jpg' },
          // { url: 'https://www.example.ie/og-image-04.jpg' },
        ]
      }}
    />
  )
}

Seo.defaultProps = {
  lang: 'en',
  meta: [],
  description: ''
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

export default Seo
