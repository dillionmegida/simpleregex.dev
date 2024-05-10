import useRegex from "../components/mdx/regex-hooks"
import { renderHook } from "@testing-library/react"

describe("useRegex", () => {
  test("one match works", () => {
    const pattern = "/hello/"
    const input = "I said hello"

    const { result } = renderHook(() =>
      useRegex({
        input,
        pattern,
      })
    )

    const expectedString = `I said <span class="match">hello</span>`
    expect(result.current.modifiedString).toBe(expectedString)
  })

  test("multiple matches work", () => {
    const pattern = "/hello/g"
    const input =
      "I said hello and she said hello, and they said hello"

    const { result } = renderHook(() =>
      useRegex({
        input,
        pattern,
      })
    )

    const expectedString = `I said <span class="match">hello</span> and she said <span class="match">hello</span>, and they said <span class="match">hello</span>`
    expect(result.current.modifiedString).toBe(expectedString)
  })

  test("multiple flags work", () => {
    const pattern = "/hello/ig"
    const input = "Hello, and then he also said hello"

    const { result } = renderHook(() =>
      useRegex({
        input,
        pattern,
      })
    )

    const expectedString = `<span class="match">Hello</span>, and then he also said <span class="match">hello</span>`
    expect(result.current.modifiedString).toBe(expectedString)
  })

  test("one group works", () => {
    const pattern = "/(hello)/"
    const input = "Why did they say hello?"

    const { result } = renderHook(() =>
      useRegex({
        input,
        pattern,
      })
    )

    const expectedString = `Why did they say <span class="match"><span class='match__group'>hello</span></span>?`
    expect(result.current.modifiedString).toBe(expectedString)
  })

  test("multiple groups work", () => {
    const pattern = "/(say) (hello)/"
    const input = "Why did they say hello?"

    const { result } = renderHook(() =>
      useRegex({
        input,
        pattern,
      })
    )

    const expectedString = `Why did they <span class="match"><span class='match__group'>say</span>&nbsp;<span class='match__group'>hello</span></span>?`
    expect(result.current.modifiedString).toBe(expectedString)
  })

  test("no matches", () => {
    const pattern = "/codes/"
    const input = "I know how to code"

    const { result } = renderHook(() =>
      useRegex({
        input,
        pattern,
      })
    )

    const expectedString = `I know how to code`
    expect(result.current.modifiedString).toBe(expectedString)
  })

  test("match a newline", () => {
    const pattern = "/new\\nline/"
    const input = `I am a new
line input`

    const { result } = renderHook(() =>
      useRegex({
        input,
        pattern,
      })
    )

    const expectedString = `I am a <span class='match'>new</span><span class='newline-end'></span><br/><span class='newline-start'></span><span class='match'>line</span> input`
    expect(result.current.modifiedString).toBe(expectedString)
  })

  test("match newlines", () => {
    const pattern = "/\\n{2}/g"
    const input = `What does that mean?
Huh?

What are we going to do?`

    const { result } = renderHook(() =>
      useRegex({
        input,
        pattern,
      })
    )

    const expectedString = `What does that mean?<br/>Huh?<span class='match'><span class='match'></span><span class='newline-end'></span><br/><span class='newline-start'></span><span class='match'></span></span><span class='newline-end'></span><br/><span class='newline-start'></span><span class='match'></span>What are we going to do?`
    expect(result.current.modifiedString).toBe(expectedString)
  })
})
