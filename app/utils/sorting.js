const positionSort = (a, b) => {
    if (a.position > b.position) {
      return 1;
    } else if (a.position > b.position) {
      return -1;
    }

    return 0;
}

const labelSort = (a, b) => {
  const labelA = a.label.toUpperCase();
  const labelB = b.label.toUpperCase();
  if (labelA < labelB) {
    return -1;
  }
  if (labelA > labelB) {
    return 1;
  }

  return 0;
}

export {
  positionSort,
  labelSort
}
