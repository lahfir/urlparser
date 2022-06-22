const domainExtensions = require("./utils/domainExtensions");
const WITH_HTTP =
  "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)";
const WITHOUT_HTTP =
  "[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)";

function checkRegex(string) {
  var regex = new RegExp(
    "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
  );
  console.log(string.match(regex));
  return string.match(regex);
}

function stringExtractor(string) {
  try {
    let arr = string.match(/("[^"]+"|[^"\s]+)/g);

    const exp = /^[a-zA-Z]/;

    arr = arr.filter((el) => {
      try {
        const index = el.indexOf(".");
        if (index > 0) {
          if (el[index - 1].match(exp) && el[index + 1].match(exp)) {
            return true;
          }
        }
      } catch (e) {
        // console.log(e.message)
      }
    });

    arr = arr.filter((el) => domainExtensions.some((e) => el.includes(e)));
    return arr;
  } catch (e) {
    console.log(e.message);
  }
}

// process.on("message", ({ string }) => {
//   if (string) {
//     process.send(stringExtractor(string));
//   }
// });

module.exports = stringExtractor;
