import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        todosInfo: {
          keyArgs: false,
          merge(existing, incoming) {
            let data = []
            if (existing && existing.data) {
              data = data.concat(existing.data)
            }
            if (incoming && incoming.data) {
              data = data.concat(incoming.data)
            }

            return {
              ...incoming,
              data
            }
          }
        }
      }
    }
  }
})
