function compareDeep(a, b) {
  if (a === b) return true
  if (!(a && typeof a === 'object')
    || !(b && typeof b === 'object')) return false
  const array = Array.isArray(a)
  if (Array.isArray(b) !== array) return false
  if (array) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i += 1) if (!compareDeep(a[i], b[i])) return false
  } else {
    const keysA = Object.keys(a)
    for (let i = 0; i < keysA.length; i += 1) {
      if (!(keysA[i] in b) || !compareDeep(a[keysA[i]], b[keysA[i]])) return false
    }
    const keysB = Object.keys(b)
    for (let i = 0; i < keysA.length; i += 1) if (!(keysB[i] in a)) return false
  }
  return true
}

export default function (state, type, attrs) {
  const {
    from,
    $from,
    to,
    empty,
  } = state.selection

  let result = false

  if (empty) {
    result = !!type.isInSet(state.storedMarks || $from.marks())
  } else {
    result = !!state.doc.rangeHasMark(from, to, type)
  }

  if (attrs && attrs !== {} && result) {
    result = $from.marks().find(x => compareDeep(x.attrs, attrs))
  }

  return result
}
