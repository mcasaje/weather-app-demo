import * as requestPromise from 'request-promise'

namespace Request {
  export const get = (url: string): any => {
    requestPromise.get(url)
  }
}

export default Request
