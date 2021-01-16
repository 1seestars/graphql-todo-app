import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        todosInfo: {
          keyArgs: false,
          merge(existing, incoming, { args }) {
            const exData = existing ? existing.data : []
            let data = []
            if (args.cache || incoming.data.length === 1) {
              data = [...exData, ...incoming.data]
            } else {
              data = exData
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
