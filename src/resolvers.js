const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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

module.exports = resolvers