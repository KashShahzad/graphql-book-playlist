const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

// this schema will define the data which will be pointed to query
// it describes object types, relationship b/w those objects and
// defines how we reach out to data, either quering retrive or modify

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//TODO: defining the object types

const BookType = new GraphQLObjectType({
  name: "Book",
  //well wrap the fields into func for the sake of identification
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      //creating relationship
      resolve(parent, args) {
        // return _.find("", { id: parent.authorId });
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      //since its gonna be list
      type: new GraphQLList(BookType),
      //creating relationship
      resolve(parent, args) {
        // return _.filter("", { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

//TODO: Defining the RootQueries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //start of query
    book: {
      //type of object it is targetting
      type: BookType,
      //possible args
      args: { id: { type: GraphQLID } },
      //what it should do and connect to db
      resolve(parent, args) {
        return Book.findById(arg.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return author;
        return Author.find({});
      },
    },
  },
});

//Defining the Mutations on data
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });

        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
