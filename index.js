const App = require('./app');

/**
 * Server Started
 *
 *    npm start -p 3000
 *
 */

const port = process.argv[2];
const app = new App(port);

app.start();
