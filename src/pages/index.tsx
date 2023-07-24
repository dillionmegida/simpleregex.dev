import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import LandingHeader from "../components/landing-header"

const Body = styled.div`
  color: white;
  &.container {
    padding: 50px 20px;
  }

  p,
  li {
    font-size: 20px;
    line-height: 30px;
  }

  .highlight {
    padding: 5px;
    background-color: var(--color-regex-dark-3);
    border-radius: 5px;
  }

  a {
    color: var(--color-regex);
  }

  .help {
    position: relative;
    padding: 40px;
    margin: 50px 0 80px;
    color: white;
    isolation: isolate;
    text-align: center;

    p {
      font-size: 30px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background-color: var(--color-regex-dark-2);
      width: 100%;
      height: 100%;
      z-index: -1;
      rotate: -1deg;
      box-shadow: 15px 15px 0 var(--color-regex-dark-3);
    }
  }

  .written-version {
    margin-top: 50px;
  }
`

const Outline = styled.div`
  ol {
    padding-left: 20px;
  }

  li {
    list-style-type: decimal;
    padding-left: 5px;
    a {
      /* color: var(--color-regex-dark-3); */
    }
  }
`

const IndexPage = ({ data }) => {
  const items = data.allMdx.nodes

  return (
    <Layout Header={<LandingHeader />}>
      {/* <LandingPage /> */}
      <Body className="container">
        <p className="sec-font">
          Regular Expressions are one of the{" "}
          <span className="highlight">fundamentals</span> in Software
          Development, but at the same time, not the easiest technology to
          learn. And that's the inspiration behind the course.
        </p>
        <div className="help">
          <p>I'll help you understand Regular Expressions 😉</p>
        </div>
        <p>
          This course is available on{" "}
          <a href="https://www.youtube.com/playlist?list=PLLdz3KlabJv1UVT8cZ-h4iI7fRqC_rArb">
            my YouTube channel as a playlist
          </a>
          .
        </p>
        <div className="written-version"></div>
        <Outline>
          <h2>Outline</h2>
          <p>Here is the written version of the course</p>
          <ol start={0}>
            {items.map(item => {
              const {
                frontmatter: { title },
                fields: { slug },
              } = item

              return (
                <li>
                  <Link to={slug}>{title}</Link>
                </li>
              )
            })}
          </ol>
        </Outline>
      </Body>
    </Layout>
  )
}

export default IndexPage

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => (
  <Seo defaultTileOnly title="Simplified Regular Expressions" />
)

export const pageQuery = graphql`
  {
    allMdx(sort: { fields: { orderId: ASC } }) {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`
