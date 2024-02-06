import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import LandingHeader from "./landing-header"

const Container = styled.div`
  background-image: radial-gradient(
    color-mix(in srgb, var(--color-regex-dark-3), transparent 80%) 1px,
    transparent 1px
  );
  background-size: 10px 10px;
`

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

const Layout = ({ Header, children }) => {
  return (
    <Container>
      {Header}
      <main>{children}</main>
      <Footer className="container">
        <a href="https://deeecode.com">deeecode.com</a> ©{" "}
        {new Date().getFullYear()}
      </Footer>
    </Container>
  )
}

export default Layout
