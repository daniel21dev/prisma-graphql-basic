const { ApolloServer, gql } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const typeDefs = gql`
    type Category{
        name: String
    }
    type Product{
        name: String
        category: String
    }

    input CategoryInput{
        name: String!
    }
    input ProductInput{
        name: String!
        categoryId: Int!
    }

    type Query{
        categories: [Category]
        products: [Product]
    }

    type Mutation{
        newCategory(input: CategoryInput): Category
        newProduct(input: ProductInput): Product
    }
`

const resolvers = {
    Query:{
        categories: async () =>{
            const categories = await prisma.category.findMany()
            return categories
        },
        products: async()=>{
            const products = await prisma.product.findMany({
                include:{ category: true }
            })
            return products
        }
    },
    Mutation:{
        newCategory: async (_,{input}) =>{
            const {name} = input
            
            const category = await prisma.category.create({
                data:{ name }
            })

            return category
        },
        newProduct: async(_,{ input }) =>{
            const { name, categoryId } = input

            const category = prisma.category.findUnique({ where:{ id: categoryId }})

            if( !category ){
                throw new Error('The category does not exists');
            }

            const product = await prisma.product.create({
                data:{
                    name,
                    categoryId
                }
            })
            return product
        }
    }
}
const server =  new ApolloServer({ typeDefs, resolvers})

server.listen().then(({ url })=>{
  console.log(`🚀  Server ready at ${url}`);
})