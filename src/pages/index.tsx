import * as React from "react"
import { Link, graphql } from "gatsby"
import { LINKS } from "../constants"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import LandingHeader from "../components/landing-header"
import { truncateStr } from "../helpers/string"

const Body = styled.div`
  color: var(--color-text);
  &.container {
    padding: 50px 30px;
  }

  .sec-font {
    font-size: clamp(1rem, 7vw, 1.7rem);
  }

  p,
  li {
    font-size: 1.4rem;
    line-height: 1.4;
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
    padding: 1.5em;
    margin: 50px 0 80px;
    color: var(--color-text);
    isolation: isolate;
    text-align: center;

    p {
      font-size: clamp(1.1rem, 7vw, 1.7rem);
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
  /* background-color: color-mix(in srgb, var(--color-regex), transparent 90%); */
  margin-top: 10px;
  /* clip-path: polygon(0 4%, 100% 0, 100% 95%, 0% 100%); */
  padding: 30px 0;

  .outline__header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    column-gap: 40px;
  }

  h2,
  p {
    padding: 0;
  }

  p {
  }

  .outline__tag {
    font-size: 1.1rem;
    background-color: var(--color-regex-dark-3);
    padding: 0 5px;
    line-height: 1.2em;
    margin-top: 3px;
  }

  .lessons {
    display: grid;
    padding: 0;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    grid-auto-rows: 1fr;
  }

  .lesson {
    list-style-type: none;
    background-color: color-mix(in srgb, var(--color-regex), black 90%);
    /* padding-left: 5px; */
    a {
      display: block;
      height: 100%;
      text-decoration: none;

      padding: 30px;
      transition: color 300ms, background-color 300ms, border-color 300ms;
      position: relative;
      border: 2px solid transparent;
      /* border-top: 2px solid white; */
      /* border-radius: 5px; */

      &:is(&:hover, &:focus) {
        outline: none;
        color: var(--color-text);
        border: 2px solid white;
        background-color: color-mix(in srgb, var(--color-regex), black 90%);
      }
    }

    .lesson__title {
      font-weight: 700;
      display: block;
    }

    .lesson__desc {
      font-size: clamp(1rem, 7vw, 1.1rem);
      color: var(--color-text);
      line-height: 1.2em;
      margin-top: 10px;
      display: block;
    }
  }
`

const IndexPage = ({ data }) => {
  const items = data.allMdx.nodes

  return (
    <Layout Header={<LandingHeader />}>
      {/* <LandingPage /> */}
      <Body>
        <div className="container">
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
            <a href={LINKS.playlist}>my YouTube channel as a playlist</a>.
          </p>
        </div>
        <hr />
        <Outline>
          <div className="container">
            <div className="outline__header">
              <h2>Outline</h2>
              <p className="outline__tag">
                Here is the written version of the course
              </p>
            </div>
            <ol className="lessons" start={0}>
              {items.map(item => {
                const {
                  frontmatter: { title, description, shortTitle },
                  fields: { slug },
                } = item

                return (
                  <li className="lesson">
                    <Link to={slug}>
                      <span className="lesson__title">{shortTitle}</span>
                      <span className="lesson__desc">
                        {truncateStr(description)}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
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
          shortTitle
          description
        }
        fields {
          slug
        }
      }
    }
  }
`
