var request = require("request");
var app = require("../app/app.js");
var base_url = "http://localhost:3000/";
var films_api_url = "http://localhost:3000/films/api";
var aws = require('../app/private/aws-lib/lib/aws');

var prodAdv;

describe("Index.js:", function() {
  beforeEach(function() {
    prodAdv = {
      call: function(){}
    };
  });

  describe("GET /", function() {
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

  describe("POST /films/api", function() {

    it("calls the aws prodAdv function", function(done) {
      spyOn(prodAdv, "call");
      request.post(films_api_url, function(error, response, body) {
        expect(prodAdv.call.calls.any()).toEqual(true);
        done();
      });
    });

  });


});
