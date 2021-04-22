"use strict";
let expect = require("chai").expect;
let mongoose = require("mongoose");
let mongodb = require("mongodb");
const fetch = require("node-fetch");

module.exports = function(app) {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  //create mongoose Schema and Model
  let stockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    like: Boolean,
    ips: [String]
  });

  let Stock = mongoose.model("stock", stockSchema);

  app.route("/api/stock-prices").get(async function(req, res) {
    let stockName = req.query.stock;
    let ipAdress = [req.ip];

    let apiUrl =
      "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/" +
      `${stockName}` +
      "/quote";

    let apiUrls = [
      "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/" +
        `${stockName[0]}` +
        "/quote",
      "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/" +
        `${stockName[1]}` +
        "/quote"
    ];

    //get the price of the stocks
    const priceChecker = async () => {
      if (typeof stockName == "string") {
        const result = await fetch(apiUrl).then(res => res.json());
        return [result.symbol, result.latestPrice];
      } else if (stockName.length == 2) {
        const first = await fetch(apiUrls[0]).then(res => res.json());
        const second = await fetch(apiUrls[1]).then(res => res.json());
        return [
          first.symbol,
          second.symbol,
          first.latestPrice,
          second.latestPrice
        ];
      }
    };

    let result = await priceChecker(); //[symbol, price] / [[sym1, sym2, price1, price2]]

    //get how many likes
    let findLikedNum = async name => {
      let matched = await Stock.find({ name: name }).exec();
      return matched.length;
    };
    let likedNum = await findLikedNum(result[0]);
    let likedNum2 = await findLikedNum(result[1]);

    // function > add likes if there hasn't been liked yet by the same ipAdress
    let addLike = async (name, ip) => {
      if ((await Stock.findOne({ name: name, ips: ip }).exec()) == null) {
        Stock.create({
          name: name,
          like: true,
          ips: ip
        });
      }
      return;
    };

    //add likes and send the json result
    if (result.length == 2) {
      if (req.query.like) {
        addLike(result[0], ipAdress);
      }
      return res.json({
        stockData: { stock: result[0], price: result[1], likes: likedNum }
      });
    } else if (result.length == 4) {
      if (req.query.like) {
        addLike(result[0], ipAdress);
        addLike(result[1], ipAdress);
      }
      let likes1 = likedNum - likedNum2;
      let likes2 = likedNum2 - likedNum;
      res.json({
        stockData: [
          { stock: result[0], price: result[2], rel_likes: likes1 },
          { stock: result[1], price: result[3], rel_likes: likes2 }
        ]
      });
      return;
    }
  });
};
