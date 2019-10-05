# ISBN service

## Response payload

Example: 
Request: /find/9781506702643

Example response
```json
{
  url: "https://isbnsearch.org/isbn/9781506702643",
  title: "https://images-na.ssl-images-amazon.com/images/I/51PCXMTnd3L._SL200_.jpg",
  isbn_10: "1506702643",
  isbn_13: "9781506702643",
  author: "Milo Manara; Federico Fellini; Silverio Pisu",
  binding: "Paperback",
  publisher: "Dark Horse Books",
  published: "November 2017",
  language: "",
  cover: "https://images-na.ssl-images-amazon.com/images/I/51PCXMTnd3L._SL200_.jpg"
}
```

## TODO
- [ ] Add at least 5 sources -  current 3/10
- [ ] Add [graphql](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-micro)
- [ ] Add tests
- [ ] Port to TS

## Sources

- [x] ISBN Search
- [x] OPENLibrary
- [x] ISBNDB
- [ ] Bookfinder
- [ ] Bookfinder4u
