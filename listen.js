const app = require ('./app.js')
const { PORT = 9090 } = process.env;
const {runseed} = require('./db/runseed')

runseed()

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})
