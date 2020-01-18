import io from 'socket.io-client'

function createSocket() {
  let socket

  function connect({ latitude, longitude, techs }) {
    if (socket && socket.connected) socket.close()

    socket = io('http://192.168.100.51:3333', {
      autoConnect: false,
      query: {
        latitude,
        longitude,
        techs,
      },
    })

    socket.connect()

    console.log('socket has been connected')
  }

  function subscribe({ event, callback }) {
    socket.on(event, callback)

    console.log(`it has been started to listen ${event}`)
  }

  return {
    connect,
    subscribe,
  }
}

export default createSocket
