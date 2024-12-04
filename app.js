import express from 'express'

const app = express()
app.use(express.json())

const server = app.listen(process.env.PORT, () => {
  console.log('Server running')
})