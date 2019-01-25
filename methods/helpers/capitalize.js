const capitalize = (s) => {
  if (typeof s !== 'string') return null
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default capitalize;
// Helper that capitalize string . It only accept string value and return null if conditions are not met.