import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Cover = styled.div`
  with: 100%;

  img {
    width: 100%;
  }
`

const Layout = ({ title, children }) => {
  return (
    <div className="global-wrapper">
      <header className="global-header">
        <Link className="header-link-home" to="/">
          <h1>{title}</h1>
        </Link>
        <Cover className="cover">
          <img
            src="/regex-course-cover.png"
            alt="Regular Expressions Course Cover"
          />
        </Cover>
      </header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout
