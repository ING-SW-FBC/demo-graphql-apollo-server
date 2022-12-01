import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs = `
  type Book {
    id:Int
    title: String
    author: String
  }
  type Query {
    books: [Book]
    book(id:Int):Book
  }
  type Mutation{
    addBook(title:String,author:String):Book
}
`;
let counter = 1;
const books = [
    {
        id: 1,
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        id: 2,
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const resolvers = {
    Query: {
        books: () => books,
        book: (_, data) => {
            for (let index = 0; index < books.length; index++) {
                if (books[index].id == data.id) {
                    return books[index];
                }
            }
            return null;
        }
    },
    Mutation: {
        addBook: (_, data) => {
            var newBook = { id: counter, title: data.title, author: data.author };
            books.push(newBook);
            counter++;
            return newBook;
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
