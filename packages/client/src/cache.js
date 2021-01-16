import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        todosInfo: {
          merge(existing = {}, incoming) {
            return {
              ...existing,
              ...incoming
            }
          }
        }
      }
    }
  }
})
