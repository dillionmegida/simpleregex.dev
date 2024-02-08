import React from "react"
import styled from "styled-components"

const Container = styled.div`
  border: 1px solid yellow;
  padding: 20px;
  position: relative;
  border-radius: 10px;
  height: max-content;
  margin-bottom: 20px;
  background-color: color-mix(in srgb, yellow, var(--color-regex-dark) 95%);

  &::after {
    content: "";
    position: absolute;
    background-color: #949409;
    border-radius: inherit;
    inset: 15px;
    z-index: -1;
    transform: translateY(25px);
  }

  .label {
    position: absolute;
    top: -12px;
    font-size: 14px;
    background-color: #c6c60b;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 10px;
    color: var(--color-regex-dark);
  }

  &.important-block a {
    color: yellow;
    background-color: var(--color-regex-dark-2);
    padding: 2px 3px;
    border-radius: 5px;
    font-size: calc(100% - 1px);
    transition: background-color 300ms, color 300ms;

    &:hover {
      background-color: yellow;
      color: black;
      text-decoration: none;
    }
  }

  p {
    margin: 0;
    color: var(--color-text);
    font-size: calc(100% - 2px);
  }
`

export default function ImportantBlock({ children }) {
  return (
    <Container className="important-block">
      <span className="label">Important</span>
      {children}
    </Container>
  )
}
