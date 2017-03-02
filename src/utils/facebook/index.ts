import { Facebook } from 'fb'

const facebook = new Facebook()



export default {
  setAccessToken: (accessToken: string) => facebook.setAccessToken(accessToken),

  api: (path: string, options: object) => new Promise((resolve, reject) =>
    facebook.napi(path, options, (error, response) => {
      if(error) return reject(error)
      resolve(response)
    }))
}
