import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Layout = ({ title, children }) => {
  return (
    <div className="global-wrapper">
      <header className="global-header">
        <Link className="header-link-home" to="/">
          <h1>{title}</h1>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
