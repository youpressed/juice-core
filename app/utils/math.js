const roundTo = (num, precision = 1) => {
  const parsed = parseFloat(num);
  return parsed.toFixed(1);
}

export {
  roundTo
}
