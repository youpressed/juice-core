const roundTo = (num, precision = 1) => {
  const parsed = parseFloat(num);
  return parsed.toFixed(precision);
}

export {
  roundTo
}
