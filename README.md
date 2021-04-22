# FreeCodeCamp Stock Price Checker JS 

___
### instructiona

1. SET NODE_ENV to test without quotes and set DB to your MongoDB connection string
2. Complete the project in routes/api.js or by creating a handler/controller
3. You will add any security features to server.js
4. You will create all of the functional tests in tests/2_functional-tests.js
___

Write the following tests in tests/2_functional-tests.js:

- Viewing one stock: GET request to /api/stock-prices/
- Viewing one stock and liking it: GET request to /api/stock-prices/
- Viewing the same stock and liking it again: GET request to /api/stock-prices/
- Viewing two stocks: GET request to /api/stock-prices/
- Viewing two stocks and liking them: GET request to /api/stock-prices/
___
### test

- You should set the content security policies to only allow loading of scripts and CSS from your server.

- You can send a GET request to /api/stock-prices, passing a NASDAQ stock symbol to a stock query parameter. The returned object will contain a property named stockData.

- The stockData property includes the stock symbol as a string, the price as a number, and likes as a number.

- You can also pass along a like field as true (boolean) to have your like added to the stock(s). Only 1 like per IP should be accepted.

- If you pass along 2 stocks, the returned value will be an array with information about both stocks. Instead of likes, it will display rel_likes (the difference between the likes on both stocks) for both stockData objects.

- All 5 functional tests are complete and passing.
