import { createApp } from './app'

// Receives the context of the render call, returning a Promise resolution to the root Vue instance.
export default context =>
  new Promise((resolve, reject) => {
    const { app } = createApp()
    console.log(context)
    return resolve(app)
  })
