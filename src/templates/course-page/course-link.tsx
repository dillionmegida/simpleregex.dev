import React from 'react'
import { LINKS } from '../../constants'
import { Link } from 'gatsby'

export default function CourseLink({ path, label }) {
    const link = LINKS[path]
  
    return <Link to={link}>{label}</Link>
  }
  