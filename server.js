// Functionally start the server
// Separated from app.js for testing purposes
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});