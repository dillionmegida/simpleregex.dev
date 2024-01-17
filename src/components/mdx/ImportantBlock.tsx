import React from "react"
import styled from "styled-components"

const Container = styled.div`
  border: 1px solid yellow;
  padding: 20px;
  position: relative;
  border-radius: 10px;
  height: max-content;
  margin-bottom: 20px;
  background-color: var(--color-regex-dark);

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

  p {
    margin: 0;
  }
`

export default function ImportantBlock({ children }) {
  return (
    <Container className='important-block'>
      <span className="label">Important</span>
      {children}
    </Container>
  )
}
