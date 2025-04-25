const paginate = (items, limit, offset) => {
  const start = offset || 0
  const end = limit ? start + limit : null
  return items.slice(start, end)
}

module.exports = { paginate }
