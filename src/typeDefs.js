const { gql } = require("apollo-server")

const typeDefs = gql`
    type Category{
        id: ID
        name: String
    }
    type Product{
        id: ID
        name: String
        category: Category
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

module.exports = typeDefs