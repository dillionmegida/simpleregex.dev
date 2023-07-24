import React from "react"
import styled from "styled-components"

const headingSizes = {
  xl: 100,
  l: 80,
}

const Header = styled.header<{ size: "xl" | "l" }>`
  --font-size: ${({ size }) => headingSizes[size]}px;

  background-color: var(--color-regex-dark-2);
  margin: 0;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  position: relative;
  clip-path: polygon(0 0, 100% 0%, 100% 89%, 0% 100%);

  @media (max-width: 1000px) {
    --font-size: 70px;
  }

  @media (max-width: 800px) {
    --font-size: 50px;
  }

  @media (max-width: 500px) {
    --font-size: 40px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0 -50px;
    background: repeating-radial-gradient(#000 0 0.0001%, #fff 0 0.0002%) 60%
        60%/3000px 3000px,
      repeating-conic-gradient(#000 0 0.0001%, #fff 0 0.0002%) 40% 40%/4000px
        3000px;
    z-index: -1;
    background-blend-mode: difference;
    filter: blur(2px) contrast(100) brightness(40);
    mix-blend-mode: darken;
  }

  .regex-pro-text {
    text-align: center;
    text-transform: uppercase;
    display: block;
    color: var(--color-regex-light);
  }

  h1 {
    font-size: var(--font-size);
    text-align: center;
    &::before {
      content: "/";
      color: var(--color-regex);
      font-weight: 500;
    }

    &::after {
      content: "/gi";
      color: var(--color-regex);
      font-weight: 500;
    }

    .break::before {
      content: "\\d";
      font-weight: 500;
    }
  }

  .course-box {
    display: block;
    text-align: center;
    margin: 0 auto;
    width: 180px;
    background-color: var(--color-regex-dark-3);
    padding: 15px;
    rotate: -2deg;
    color: white;
    margin-top: 10px;
    font-family: var(--font-heading);
  }
`

export default function LandingHeader({ children = null, size = "xl" }) {
  if (children) {
    return (
      <Header size={size}>
        <div className="container">{children}</div>
      </Header>
    )
  }

  return (
    <Header size={size}>
      <div className="container">
        <span className="regex-pro-text main-font">Become a Regex PRO 💪🏽</span>
        <h1>
          Simplified Regular<span className="break"></span>
          <br />
          Expressions
        </h1>
        <span className="course-box">FREE COURSE ✨</span>
      </div>
    </Header>
  )
}
