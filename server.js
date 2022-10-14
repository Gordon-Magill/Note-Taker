// Functionally start the server
// Separated from app.js for testing considerations
const app = require("./app");

const PORT = 3000;

// Port options are to facilitate heroku deployment
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `App listening at http://localhost:${process.env.PORT || PORT} 🚀`
  );
});
