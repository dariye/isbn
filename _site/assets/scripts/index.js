// import 'https://unpkg.com/unfetch/polyfill'

/**
 * 
 * fetch('https://1jzxrj179.lp.gql.zone/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ posts { title } }' }),
})
  .then(res => res.json())
  .then(res => console.log(res.data));
 */

function loadGQLPlayaground() {
  const gqlplayground = document.getElementById("gqlplayground");
  gqlplayground.classList.add("playgroundIn");
  GraphQLPlayground.init(gqlplayground, {
    endpoint: "http://localhost:3000/graphql"
  });
}

function app() {
  loadGQLPlayaground();
}

window.addEventListener("load", function(event) {
  app();
});
