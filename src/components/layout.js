import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ title, children }) => {
  return (
    <div className="global-wrapper">
      <header className="global-header">
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      </header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout
