const http = require("http");
const url = require("url");

const server = http.createServer(handler).listen(7777, () => {
  console.log("server listen on ", 7777);
});

function handler(request, response) {
  let postData = "";
  const pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");
  request.setEncoding("utf8");

  request.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
    console.log("Received POST data chunk '" + postDataChunk + "'.");
  });

  request.addListener("end", function() {
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(postData);
    response.end();
  });
}
