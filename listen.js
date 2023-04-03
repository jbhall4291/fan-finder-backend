const app = require ('./app.js')
const { PORT = 9090 } = process.env;
const runSeed = require('./db/runseed')

runSeed()

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})
