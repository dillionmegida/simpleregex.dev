import React, { ReactNode } from "react"
import styled from "styled-components"

const headingSizes = {
  xl: 6.5,
  l: 5,
}

const Wrapper = styled.div`
  background-color: var(--color-regex-dark-2);
  color: var(--color-text);

  /* position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    background-image: radial-gradient(
      var(--color-regex-dark-3) 1px,
      transparent 1px
    );
    background-size: 10px 10px;
    width: 40%;
    height: 200px;
    z-index: 3;
  } */
`

const Header = styled.header<{ size: "xl" | "l" }>`
  --font-size: ${({ size }) => headingSizes[size]}rem;

  background-image: radial-gradient(
    color-mix(in srgb, var(--color-regex-dark-3), transparent 60%) 1px,
    transparent 1px
  );
  background-size: 10px 10px;
  margin: 0;
  height: max-content;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  position: relative;

  @media (max-width: 1000px) {
    --font-size: 5rem;
  }

  @media (max-width: 800px) {
    --font-size: 3rem;
  }

  @media (max-width: 500px) {
    --font-size: 2.5rem;
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
    color: var(--color-text);

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
    margin-top: 10px;
    font-family: var(--font-heading);
  }
`

export default function LandingHeader({
  children = null,
  size = "xl",
}: {
  children: ReactNode
  size: "xl" | "l"
}) {
  if (children) {
    return (
      <Wrapper>
        <Header size={size}>
          <div className="container">{children}</div>
        </Header>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Header size={size}>
        <div className="container">
          <span className="regex-pro-text main-font">
            Become a Regex PRO 💪🏽
          </span>
          <h1>
            Simplified Regular<span className="break"></span>
            <br />
            Expressions
          </h1>
          <span className="course-box">FREE COURSE ✨</span>
        </div>
      </Header>
    </Wrapper>
  )
}
