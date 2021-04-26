let mongoose = require("mongoose");


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

exports.Stock = Stock;