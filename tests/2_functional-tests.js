const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  suite("GET request test", () => {
    test("Viewing one stock", done => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: "goog" })
        .end((err, res) => {
          assert.equal(res.body["stockData"]["stock"], "GOOG");
          assert.isNotNull(res.body["stockData"]["price"]);
          done();
        });
    });

    test("Viewing one stock and liking it", done => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: "goog" })
        .end((err, res) => {
          assert.equal(res.body["stockData"]["stock"], "GOOG");
          assert.isNotNull(res.body["stockData"]["price"]);
          assert.equal(res.body["stockData"]["likes"], 1);
          done();
        });
    });

    test("Viewing the same stock and liking it again", done => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: "goog" })
        .end((err, res) => {
          assert.equal(res.body["stockData"]["stock"], "GOOG");
          assert.isNotNull(res.body["stockData"]["price"]);
          assert.equal(res.body["stockData"]["likes"], 1);
          done();
        });
    });

    test("Viewing two stocks", done => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: ["amzn", "goog"] })
        .end((err, res) => {
          let stockData = res.body["stockData"];
          assert.isArray(stockData);
          if (stockData[0]["stock"] == "amzn") {
            assert.equal(stockData[0]["stock"], "AMZN");
            assert.isNotNull(stockData[0]["price"]);
            assert.equal(stockData[0]["rel_likes"], 0);
          } else {
            assert.equal(stockData[1]["stock"], "GOOG");
            assert.isNotNull(stockData[1]["price"]);
            assert.equal(stockData[1]["rel_likes"], 0);
          }

          done();
        });
    });

    test("Viewing two stocks and liking them", done => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: ["amzn", "goog"] })
        .end((err, res) => {
          let stockData = res.body["stockData"];
          assert.isArray(stockData);
          if (stockData[0]["stock"] == "amzn") {
            assert.equal(stockData[0]["stock"], "AMZN");
            assert.isNotNull(stockData[0]["price"]);
            assert.equal(stockData[0]["rel_likes"], 0);
          } else {
            assert.equal(stockData[1]["stock"], "GOOG");
            assert.isNotNull(stockData[1]["price"]);
            assert.equal(stockData[1]["rel_likes"], 0);
          }

          done();
        });
    });
  });
});
