import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        todosInfo: {
          read(existing, { args: { offset, limit } }) {
            const res = existing && existing.slice(offset, offset + limit)
            console.log(res)
            return res
          },
          merge(existing = [], { todos }) {
            // const example = [
            //   {
            //     id: '64356487563487534',
            //     body: 'To do smth',
            //     isDone: false,
            //     isPinned: true,
            //     createdAt: '54354665'
            //   }
            // ]

            return [...existing, ...todos]
          }
        }
      }
    }
  }
})
