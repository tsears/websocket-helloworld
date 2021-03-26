const app = require('express')()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src/html/index.html'))
})

let num = 0
setInterval(() => {
  ++num
  io.emit('msg', `Message ${num}`)
}, 5000)

io.on('connection', (socket) => {
  console.log('connection from', socket.client.request.headers.host)
})

const port = process.env.PORT || 3000

http.listen(port, () => {
  console.log('listening on ', port)
})
