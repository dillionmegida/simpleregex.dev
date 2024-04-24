import React from "react"
import { LINKS } from "../../constants"
import { Link } from "gatsby"
import styled from "styled-components"

const SLink = styled(Link)`
  display: inline-block;
  position: relative;

  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border: 1px solid currentColor;
    position: absolute;
    right: -5px;
    top: -2px;
  }
`

export default function CourseLink({ path, label }) {
  const link = LINKS[path]

  if (link) return <SLink to={link}>{label} </SLink>

  return <span>{label}</span>
}
