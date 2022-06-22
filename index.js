const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const stringExtractor = require("./stringExtractor");
const PORT = process.env.PORT || 3000;
const stringExtractor = require("./stringExtractor");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    "Get url's extracted from complex strings in milliseconds. Made with ❤️ by @lahfir"
  );
});

app.get("/url", (req, res) => {
  if (req.body.string) {
    if (typeof req.body.string === "string") {
      if (req.body.string.length > 0) {
        const arr = stringExtractor(req.body.string);
        if (arr.length > 0) {
          res.status(200).send({ data: arr });
        } else {
          res.status(404).send("No valid URLs found in the string");
        }
      } else {
        res
          .status(400)
          .send(
            "Empty string provided. Please provide a string with possible url's in it 🚀"
          );
      }
    } else if (Array.isArray(req.body.string)) {
      if (req.body.string.length > 0) {
        const obj = { data: [] };
        req.body.string.forEach((el, index) => {
          obj.data.push({ lineNo: index, line: el, urls: stringExtractor(el) });
        });
        res.status(200).send(obj);
      } else {
        res
          .status(400)
          .send(
            "Empty string provided. Please provide a string with possible url's in it 🚀"
          );
      }
    } else {
      res
        .status(400)
        .send(
          "Only strings and arrays are allowed. Please provide a string with possible url's in it 🚀"
        );
    }
  } else res.status(400).send("String is required to extract the url's 😁");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
