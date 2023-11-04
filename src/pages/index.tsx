import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import LandingHeader from "../components/landing-header"

const Body = styled.div`
  color: white;
  &.container {
    padding: 50px 30px;
  }

  .sec-font {
    font-size: 25px;
  }

  p,
  li {
    font-size: 20px;
    line-height: 30px;
  }

  p {
    line-height: 40px;
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
`

const Outline = styled.div`
margin-top: 30px;
  ol {
    display: grid;
    padding: 0;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
  }

  li {
    list-style-type: none;
    /* padding-left: 5px; */
    a {
      display: block;
      background-color: color-mix(in srgb, var(--color-regex), black 90%);
      text-decoration: none;
      font-weight: 700;
      padding: 30px;
      transition: color 300ms, background-color 300ms, border-color 300ms;
      position: relative;
      border: 2px solid transparent;
      border-top: 2px solid white;
      border-radius: 5px;

      &:hover {
        color: white;
        border: 2px solid white;
        background-color: color-mix(in srgb, var(--color-regex), black 90%);
      }

      /* &::after {
        content: "";
        border-radius: 5px;
        position: absolute;
        top: -3px;
        left: 0;
        z-index: -1;
        background-color: white;
        width: 100%;
        height: 20px;
      } */
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
          <p>
            <span className="highlight">/</span> I'll help you understand
            Regular Expressions 😉 <span className="highlight">/g</span>
          </p>
        </div>
        <p>
          This course is available on{" "}
          <a href="https://www.youtube.com/playlist?list=PLLdz3KlabJv1UVT8cZ-h4iI7fRqC_rArb">
            my YouTube channel as a playlist
          </a>
          .
        </p>
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
