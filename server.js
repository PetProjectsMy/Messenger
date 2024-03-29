const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("build"));
// @ts-ignore
app.get("/*", (request, response) => {
  response.sendFile(`${__dirname}/build/index.html`);
});
app.listen(port, () => console.log(`Listening on port ${port}...`));
