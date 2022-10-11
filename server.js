// Functionally start the server
//server.js
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});