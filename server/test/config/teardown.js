module.exports = async () => {
  console.log('Backend tests ended')
  await global.__server__.close()
}
