export function gameRound() {
  const aux = Array.from(Array(3).keys())

  function randomHexColor() {
    const n = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + n.slice(0, 6)
  }

  function randomIndex() {
    return Math.floor(Math.random() * (0 - 3) + 3)
  }

  return {
    gameOptions: aux.map(() => {
      return randomHexColor()
    }),
    correctOption: randomIndex(),
    questionStart: new Date(),
  }
}

export function scoreKeeping(correctOption, playerGuess, currentScore) {
  let score = currentScore

  if (correctOption === playerGuess) {
    score = score + 5

    return score
  }

  if (correctOption !== playerGuess) {
    score = score - 2

    return score
  }
}

export function sidebarSorting(arr) {
  const sorted = arr

  return !arr.length
    ? []
    : sorted.toSorted((a, b) => (a.order < b.order ? +1 : -1))
}
