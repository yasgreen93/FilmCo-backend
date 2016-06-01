var request = require("request");
var app = require("../app/app.js");
var base_url = "http://localhost:3000/";

describe("Index page", function() {
  it("returns status code 200", function(done) {
    request.get(base_url, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("has a title of FilmCo Server", function(done) {
    request.get(base_url, function(error, response, body) {
      expect(body).toContain("FilmCo Server");
      done();
    });
  });
});
