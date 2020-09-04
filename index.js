const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");


const server = express();

const projectsRouter = require('./routers/projects-router')
const actionsRouter = require('./routers/actions-router')


server.use(express.json()); // built-in middleware
server.use(helmet()); // 3rd party middleware
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)




module.exports = server;

const port = 8000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:8000 ***\n`);
});

