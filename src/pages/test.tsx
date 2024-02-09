import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import useRegex from "../components/mdx/regex-hooks"
import Seo from "../components/seo"
import { getUrlString } from "../components/mdx/regex-utils"
import { Link } from "gatsby"

const Wrapper = styled.div`
  &.container {
    padding: 40px 20px;
    max-width: 800px;
  }

  .go-home {
    color: white;
    text-decoration: none;

    &::after {
      content: " >";
      color: var(--color-regex);
    }

    &:hover {
      color: var(--color-regex);
    }
  }
`

const Container = styled.div`
  background-color: #282a36;
  border-radius: 10px;
  border-top-left-radius: 0px;
  margin: 40px 0 30px;
  position: relative;
  color: white;
  width: 100%;

  .pattern-block,
  .input-block {
    padding: 15px;
    display: flex;
    width: 100%;
    overflow-x: auto;

    &__label {
      font-size: 16px;
      margin-right: 20px;
      color: #979ecd;
      width: 60px;
      position: relative;
      top: 12px;
    }

    &__string {
      border: 1px solid transparent;
      line-height: 30px;
      font-family: "Roboto Mono";
      font-size: 18px;
    }

    &__input {
      background: none;
      border: 1px solid #4a4d61;
      color: white;
      flex: 1;
      width: 100%;
      /* min-width: 100%; */
      max-width: 100%;
    }

    &__string,
    &__input {
      margin: 0;
      padding: 10px;
      min-height: 25px;
    }
  }

  .pattern-block {
    border-bottom: 1px solid #4a4d61;
    /* padding-bottom: 10px; */
    color: var(--color-regex);
  }

  .input-block {
    /* padding-top: 10px; */
  }

  /* input {
  } */

  .block-top {
    position: absolute;
    top: -25px;
    left: 0;
    display: flex;

    .type,
    button,
    .invalid-text {
      font-size: 12px;
    }

    .type {
      padding: 10px;
      background-color: #282a36;
      border-bottom: 1px solid #131419;
    }

    button {
      background-color: #131419;
      border: 1px solid #282a36;
      border-left: none;
      border-bottom: none;
      padding: 5px;
      font-size: 1rem;
      width: 60px;
      text-align: center;
      color: white;
      font-weight: bold;

      &:hover {
        background-color: white;
        color: #131419;
      }

      &.match-btn {
        background-color: var(--color-regex);
        color: #131419;

        &:hover {
          color: var(--color-regex);
          background-color: #131419;
        }
      }
    }

    .invalid-text {
      border: 1px solid #282a36;
      display: block;
      background-color: #f43b3b;
      font-weight: 600;
      color: white;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .match {
    font-weight: 600;
    position: relative;
    background-color: #2c5c2c;
    padding: 1px;

    &__group {
      background-color: #b3670b;
    }
  }

  .newline-end,
  .newline-start {
    background-color: color-mix(in srgb, #ee7539 70%, white);
  }

  .newline-end {
    padding: 0 3px;
  }

  .newline-start {
  }
`

const CopyURL = styled.button`
  border: 3px solid var(--color-regex-dar3);
  background-color: var(--color-regex-dark-2);
  padding: 15px;
  display: block;
  color: white;

  &:hover {
    border-color: white;
  }
`

export default function Regex({ location }) {
  const type = "match"

  const { search } = location

  const urlString = decodeURIComponent(search)

  const urlParse = /input="(.*?)"&pattern=(.*)/s
  const parsed = urlString.match(urlParse)

  let initialInput = "",
    initialPattern = ""

  try {
    if (parsed) {
      initialInput = parsed[1]
      initialPattern = parsed[2]
    }
  } catch (err) {
    initialInput = ""
    initialPattern = ""
  }

  const {
    editingMode,
    modifiedString,
    setPatternState,
    setInputState,
    input,
    pattern,
    findMatches,
    validate,
    setEditingMode,
    invalidRegex,
  } = useRegex({
    input: initialInput,
    pattern: initialPattern,
    type,
  })

  const copyToClipboard = async () => {
    const urlString = getUrlString(location, input, pattern)

    await navigator.clipboard.writeText(urlString)
    alert("Copied to clipboard")
  }

  return (
    <Wrapper className="container">
      <Layout location={location} theme="regex">
        <div>
          <div className="flex space-between align-center">
            <h1>Test your Regex 👇🏾</h1>
            <Link className="go-home" to="/">
              Go Home
            </Link>
          </div>
          <br />
          <Container>
            <div className="pattern-block">
              <span className="pattern-block__label">Regex</span>
              {!editingMode ? (
                <span className="pattern-block__string">{pattern}</span>
              ) : (
                <input
                  className="pattern-block__input"
                  value={pattern}
                  // onBlur={findMatches}
                  onChange={e => setPatternState(e.target.value)}
                />
              )}
            </div>
            <div className="input-block">
              <span className="input-block__label">Input</span>

              {!editingMode ? (
                <span
                  className="input-block__string"
                  dangerouslySetInnerHTML={{ __html: modifiedString }}
                />
              ) : (
                <textarea
                  className="input-block__input"
                  value={input}
                  // onBlur={findMatches}
                  onChange={e => setInputState(e.target.value)}
                />
              )}
            </div>
            <div className="block-top">
              <span className="type">
                {type === "match" ? "Match" : "Validate"}
              </span>
              {editingMode ? (
                <button
                  className="match-btn"
                  onClick={type === "match" ? findMatches : validate}
                >
                  {type === "match" ? "✓" : "Validate"}
                </button>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => setEditingMode(true)}
                >
                  Edit
                </button>
              )}
              {invalidRegex ? (
                <span className="invalid-text">{invalidRegex}</span>
              ) : (
                <></>
              )}
            </div>
          </Container>
          <CopyURL onClick={copyToClipboard} className="copy-url">
            Copy Regex URL
          </CopyURL>
        </div>
      </Layout>
    </Wrapper>
  )
}

export const Head = () => (
  <Seo imageCard="/test-your-regex.png" title="Test your regular expressions" />
)
