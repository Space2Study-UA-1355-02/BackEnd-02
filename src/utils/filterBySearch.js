const filterBySearch = (items, search) => {
  if (!search) return items

  const lowerSearch = search.toLowerCase()

  return items.filter((item) => item.toLowerCase().startsWith(lowerSearch))
}

module.exports = { filterBySearch }
