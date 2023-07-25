import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import LandingHeader from "./landing-header"

const Footer = styled.footer`
text-align: center;
  &.container {
    padding: 50px 20px 100px;
  }

  a {
    color: var(--color-regex);
    text-decoration: none;
  }
`

const Layout = ({ Header, title, children }) => {
  return (
    <div>
      {Header}
      <main>{children}</main>
      <Footer className="container">
        <a href="https://deeecode.com">deeecode.com</a> ©{" "}
        {new Date().getFullYear()}
      </Footer>
    </div>
  )
}

export default Layout