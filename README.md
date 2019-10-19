# ISBN service

## Response payload

Example:
Request: /find/9781506702643

Example response

```json
{
  "url": "https://isbnsearch.org/isbn/9781506702643",
  "title": "https://images-na.ssl-images-amazon.com/images/I/51PCXMTnd3L._SL200_.jpg",
  "isbn_10": "1506702643",
  "isbn_13": "9781506702643",
  "author": "Milo Manara; Federico Fellini; Silverio Pisu",
  "binding": "Paperback",
  "publisher": "Dark Horse Books",
  "published": "November 2017",
  "language": "",
  "cover": "https://images-na.ssl-images-amazon.com/images/I/51PCXMTnd3L._SL200_.jpg"
}
```

## TODO

- [ ] Add at least 10 sources - current 3/10
- [x] Add db source - mlab
- [x] Add [graphql](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-micro)
- [ ] Add website
- [ ] Add health check for server
- [ ] Submit to https://github.com/APIs-guru/graphql-apis
- [ ] Add to awesome-mico // built with micro
- [ ] Add tests
- [ ] Port to TS
- [ ] Source ranking; db over api call over scraping
- [ ] Open Source project
- [ ] Add bug reporting to github; using my bug reporting tool :D

## Sources

- [x] ISBN Search
- [x] OPENLibrary
- [x] ISBNDB
- [ ] Bookfinder
- [ ] Bookfinder4u
