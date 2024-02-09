import { useEffect, useState } from "react"

type Args = {
  input: string
  pattern: string
  type?: "match" | "validate"
}

export default function useRegex({ input, pattern, type = "match" }: Args) {
  const [modifiedString, setModifiedString] = useState("")
  const [patternState, setPatternState] = useState(pattern)
  const [inputState, setInputState] = useState(input)
  const [invalidRegex, setInvalidRegex] = useState("")
  const [editingMode, setEditingMode] = useState(input === "" || pattern === "")

  const findMatches = () => {
    if (inputState === "" && patternState === "") return

    try {
      // regex to match "xyz" (group) and "flags" (group) in /xyz/flags
      const regexRegex = /\/(.*)\/(\w+)?/

      // first match is full string, second match is pattern, third match is flags
      const [, patternAsString, flags] = patternState.match(
        regexRegex
      ) as RegExpMatchArray

      // construct regex pattern from extracted parameters
      const regexPattern = new RegExp(patternAsString, flags)

      let matches

      try {
        // if the pattern doesn't contain a global flag, matchAll fails
        matches = inputState.matchAll(regexPattern)
      } catch (e) {
        matches = inputState.match(regexPattern)
      }

      // store the groups in a string in a dictionary
      // for example, { "hello": ["he", "lo"]}
      let groups: {[fullstr in string]: string[]} = {}

      for (const match of matches) {
        const [fullStr, ...group] = match
        if (group.length) {
          groups[fullStr] = [...group]
        }
      }

      const newModifiedString = inputState
        .replace(regexPattern, match => {
          // if a string like "hello" has two groups: "he" and "lo"
          // combine both groups to a string with alternation: he|lo
          let groupStr = ""

          const targetGroup = groups[match]
          if (targetGroup) {
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
            let groupMatchStr

            if (groupStr !== "") {
              groupMatchStr = match.replace(
                new RegExp(groupStr, "g"),
                groupMatch => {
                  return `<span[]class='match__group'>${groupMatch}</span>`
                  // use [] to temporarily represent space so that the space will
                  // not be replaced by something else during processing of spaces
                }
              )
            }

            let elem = `<span class="match">${(groupMatchStr ?? match)
              .replace(/\n/g, "<br/>")
              .replace(/\s/g, "&nbsp;")}`
              //
              .replace(/\[\]/g, " ")
              // replace the [] from earlier with a normal space as
              // processing of spaces is done

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

      const [, patternAsString, flags] = patternState.match(regexRegex) as RegExpMatchArray

      // if pattern already begins with "^", use pattern as is
      // else, add the special characters to the pattern
      const patternWithSpecialChars = patternAsString.startsWith("^")
        ? patternAsString
        : `^${patternAsString}$`

      const regexPattern = new RegExp(patternWithSpecialChars, flags)

      const isValid = regexPattern.test(inputState)

      const newModifiedString = isValid
        ? `<span class="match">${inputState}</span>`
        : `<span>${inputState}</span>`

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

  return {
    modifiedString,
    invalidRegex,
    editingMode,
    setEditingMode,
    setPatternState,
    setInputState,
    pattern: patternState,
    input: inputState,
    findMatches,
    validate,
  }
}
