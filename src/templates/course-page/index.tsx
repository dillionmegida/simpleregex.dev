import * as React from "react"
import Layout from "../../components/layout"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../../components/seo"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "../../components/mdx/CodeBlock"
import YouTube from "react-youtube"
import CourseNav from "./course-nav"
import CourseLink from "./course-link"
import HeadingLink from "../../components/mdx/HeadingLink"
import RegexBlock from "../../components/mdx/RegexBlock"
import ImportantBlock from "../../components/mdx/ImportantBlock"
import Share from "../../components/mdx/Share"
import LandingHeader from "../../components/landing-header"
import usePageViews from "../../hooks/usePageViews"
import InfoBlock from "../../components/mdx/InfoBlock"

const Wrapper = styled.div`
  --font-size: 1.3rem;
  font-size: var(--font-size);

  img {
    width: 100%;
  }

  .important-block {
    margin: 30px 0;
  }

  .go-home {
    text-align: center;
    text-decoration: underline;
    display: block;
  }

  .landing-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
  }

  .part-block {
    text-transform: uppercase;
    background-color: var(--color-regex);
    color: var(--color-regex-dark);
    padding: 5px;
    font-size: 0.8rem;
    width: max-content;
    font-family: var(--font-heading);
    display: block;
  }

  .views-block {
    font-size: 1rem;
    width: 50px;
  }

  .content {
    display: flex;
    --side-bar-width: 0px;

    &.container {
      max-width: 800px;
    }

    .side-bar {
      max-width: var(--side-bar-width);
      position: fixed;
      top: 0;
      height: 100svh;
      width: 100%;
      margin-right: 40px;
    }

    @media (max-width: 800px) {
      --side-bar-width: 0;

      .side-bar {
        display: none;
      }
    }

    .main-content {
      width: 100%;
      width: 100%;
      margin-top: 43px;
      margin-left: var(--side-bar-width);
      color: var(--color-text);
    }
  }

  .multiline-code {
    font-size: calc(var(--font-size) - 2px);
    position: relative;
    isolation: isolate;

    &::after {
      content: "";
      position: absolute;
      background-color: var(--color-regex-dark-3);
      border-radius: 5px;
      inset: 15px;
      z-index: -1;
      transform: translateY(20px);
    }
  }

  p {
    font-size: 1.3rem;
    line-height: 1.6;
  }

  a {
    color: var(--color-regex);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    margin: 10px 0 20px;
    font-style: italic;
    padding: 20px;
    background-color: var(--color-regex-dark-1);
    border: 1px solid var(--color-regex-dark-3);
    position: relative;
    border-radius: 5px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      background-color: var(--color-regex-dark-3);
      border-radius: inherit;
      inset: 0;
      z-index: -1;
      transform: translate(10px, 10px);
    }
  }

  ul,
  ol {
    padding-left: 20px;
    margin-top: 0;
    list-style-position: initial;
    li {
      margin-bottom: 10px;
      padding-left: 10px;

      a {
        font-size: inherit;
      }
    }
  }

  ol {
    list-style: decimal;
  }

  ul {
    list-style: disc;
    padding-left: 20px;
    line-height: 25px;
  }

  h1 {
    margin-top: 10px;
  }

  h2 {
    color: var(--color-regex);
  }

  .youtube-iframe {
    margin-top: 20px;
    margin-bottom: 30px;
    border: 2px solid var(--color-regex-dark-3);
    width: 100%;

    iframe {
      width: 100%;
      min-height: 400px;
    }
  }
`

const components = {
  code: CodeBlock,
  CourseLink,
  Regex: RegexBlock,
  Important: ImportantBlock,
  Info: InfoBlock,
  h2: props => <HeadingLink Tag="h2" {...props} />,
  h3: props => <HeadingLink Tag="h3" {...props} />,
}

export default function CoursePageTemplate({ location, data, children }) {
  const {
    frontmatter: { title, youtubeId },
    fields: { orderId, slug },
  } = data.currentCourse

  const { prevCourse, nextCourse, allCourses } = data

  const { count: viewsCount } = usePageViews(slug)

  return (
    <Wrapper>
      <Layout
        location={location}
        Header={
          <LandingHeader size="l">
            <Link className="go-home main-font" to="/">
              Simple Regex
            </Link>
            <h1>{title}</h1>
            <div className="landing-bottom">
              <span className="part-block">Part {orderId}</span>
              <span className="views-block">
                {viewsCount !== null && <>👀 {viewsCount}</>}
              </span>
            </div>
          </LandingHeader>
        }
      >
        {/* <Cover className="page-cover">
          <img src={`/courses/regex/${cover}`} alt={`${title} cover`} />
        </Cover> */}

        <div className="content container">
          {/* <div className="side-bar"> */}
          {/* <SideBar
              links={allCourses.nodes.map(({ frontmatter, fields }) => ({
                label: frontmatter.title,
                href: fields.slug,
              }))}
            /> */}
          {/* </div> */}
          <div className="main-content">
            <div className="container-md">
              <CourseNav prevCourse={prevCourse} nextCourse={nextCourse} />
              {/* <CourseNav prevCourse={prevCourse} nextCourse={nextCourse} /> */}

              {/* <h1> {title}</h1> */}
              {youtubeId && (
                <>
                  <p>
                    Here is the video version for this topic. You can read the
                    written version which comes after the video section.
                  </p>
                  <YouTube className="youtube-iframe" videoId={youtubeId} />
                </>
              )}
              <MDXProvider components={components}>{children}</MDXProvider>
              <br />
              <Share title={title} url={`https://deeecode.com${slug}`} />
              <br />
              <br />
            </div>

            <CourseNav prevCourse={prevCourse} nextCourse={nextCourse} />
          </div>
        </div>
      </Layout>
    </Wrapper>
  )
}

export const Head = ({ data }) => (
  <Seo
    description={data.currentCourse.frontmatter.description}
    imageCard={`/course/${data.currentCourse.frontmatter.cover}`}
    title={data.currentCourse.frontmatter.title}
  />
)

export const pageQuery = graphql`
  query ($id: String!, $previousCourseId: String, $nextCourseId: String) {
    currentCourse: mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        cover
        youtubeId
      }
      fields {
        slug
        orderId
      }
    }
    nextCourse: mdx(id: { eq: $nextCourseId }) {
      frontmatter {
        shortTitle
      }
      fields {
        slug
      }
    }
    prevCourse: mdx(id: { eq: $previousCourseId }) {
      frontmatter {
        shortTitle
      }
      fields {
        slug
      }
    }
    allCourses: allMdx(
      sort: { fields: { orderId: ASC } }
      filter: { fields: { slug: { regex: "//courses/regex/" } } }
    ) {
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
