import React from "react"
import styled from "styled-components"

const Block = styled.div`
  font-size: 1rem;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  display: inline-block;
  border: 1px solid var(--color-info);
  background-color: color-mix(in srgb, var(--color-info), transparent 90%);

`

export default function InfoBlock({ children }) {
  return <Block>{children}</Block>
}
