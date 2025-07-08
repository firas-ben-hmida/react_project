const jsonServer = require('json-server');
const auth = require('json-server-auth'); 
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(auth);  
server.use(router);

server.listen(3000, () => {
  console.log('✅ JSON Server + Auth running at http://localhost:3000');
});
