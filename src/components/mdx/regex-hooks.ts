import { useEffect, useState } from "react"

export default function useRegex({ input, pattern, type = "match" }) {
  const [modifiedString, setModifiedString] = useState("")
  const [patternState, setPatternState] = useState(pattern)
  const [inputState, setInputState] = useState(input)
  const [invalidRegex, setInvalidRegex] = useState("")
  const [editingMode, setEditingMode] = useState(input === "" || pattern === "")

  //   const is_dev = process.env.NODE_ENV === "development"
  const is_dev = false

  const findMatches = () => {
    if (inputState === "" && patternState === "") return

    try {
      const regexRegex = /\/(.*)\/(\w+)?/

      const [, patternAsString, flags] = (
        is_dev ? pattern : patternState
      ).match(regexRegex)

      const regexPattern = new RegExp(patternAsString, flags)
      const matches = inputState.matchAll(regexPattern)

      let groups = {} as any

      for (const match of matches) {
        const [fullStr, ...group] = match
        if (group.length) {
          groups[fullStr] = [...group]
        }
      }

      const newModifiedString = (is_dev ? input : inputState)
        .replace(regexPattern, match => {
          if (input.startsWith("What does that mean?")) {
            console.log(`"${match}"`)
          }

          let groupStr = ""

          if (groups[match]) {
            const targetGroup = groups[match]
            for (let i = 0; i < targetGroup.length; i++) {
              const group = targetGroup[i]
              if (match.includes(group)) {
                if (groupStr === "") groupStr += group
                else groupStr += `|${group}`
              }
            }
          }

          if (match === "\n") {
            return `<span class='newline-end'></span><br/><span class='newline-start'></span>`
          }

          if (match.includes("\n")) {
            return match.split(/\n/).reduce((a, b) => {
              return `${
                `<span class='match'>${a}</span>` +
                "<span class='newline-end'></span><br/><span class='newline-start'></span>" +
                `<span class='match'>${b}</span>`
              }`
            })
          } else {
            let elem = `<span class="match">${match
              .replace(/\n/g, "<br/>")

              .replace(/\s/g, "&nbsp;")}`

            if (groupStr !== "") {
              elem = elem.replace(
                new RegExp(groupStr.replace(/\s/g, "&nbsp;"), "g"),
                groupMatch => {
                  return `<span class='match__group'>${groupMatch}</span>`
                }
              )
            }

            elem += "</span>"

            return elem
          }
        })
        .replace(/\n/g, "<br/>")

      setModifiedString(newModifiedString)

      if (invalidRegex) setInvalidRegex("")
      setEditingMode(false)
    } catch (e) {
      console.log(e)
      if (!invalidRegex) setInvalidRegex("Invalid Regex pattern")
    }
  }

  const validate = () => {
    if (input === "" && pattern === "") return

    try {
      const regexRegex = /\/(.*)\/(\w+)?/

      const [, patternAsString, flags] = (
        is_dev ? pattern : patternState
      ).match(regexRegex)

      const patternWithSpecialChars = patternAsString.startsWith("^")
        ? patternAsString
        : `^${patternAsString}$`

      const regexPattern = new RegExp(patternWithSpecialChars, flags)

      const isValid = regexPattern.test(is_dev ? input : inputState)

      const newModifiedString = isValid
        ? `<span class="match">${is_dev ? input : inputState}</span>`
        : `<span>${is_dev ? input : inputState}</span>`

      setModifiedString(newModifiedString)

      setEditingMode(false)

      if (!isValid)
        return setInvalidRegex("The pattern does not match this string")

      if (invalidRegex) setInvalidRegex("")
    } catch (err) {
      setInvalidRegex("The pattern does not match this string")
    }
  }

  useEffect(() => {
    if (inputState !== "" && patternState !== "") {
      if (type === "match") findMatches()
      else validate()
    }
  }, [])

  //   useEffect(() => {
  //     if (input !== "" && pattern !== "") {
  //       setInputState(input)
  //       setPatternState(pattern)

  //       setEditingMode(false)
  //       setInvalidRegex("")
  //     }
  //   }, [input, pattern])

  //   useEffect(() => {
  //     if (inputState !== "" && patternState !== "") {
  //       if (type === "match") findMatches()
  //       else validate()
  //     }
  //   }, [input, pattern])

  return {
    modifiedString,
    invalidRegex,
    editingMode,
    setEditingMode,
    setPatternState,
    setInputState,
    pattern: is_dev ? pattern : patternState,
    input: is_dev ? input : inputState,
    findMatches,
    validate,
  }
}

// /[A-Z]+\$/gi

// Also @⁨💜⁩ I need your help here as I never too strong with regex
// “type: textContent|5654$5812$7$ABCDEFGHIJK$"

// So here what i need i want to get the ABCDEFGHIJK from this string
// 😢

// @⁨Isreal Odogwu⁩
