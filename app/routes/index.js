'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');
var CardHandler = require(process.cwd() + '/app/controllers/cardHandler.js');

module.exports = function (app, db) {
   var clickHandler = new ClickHandler(db);

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });
      
   app.route('/shuffle')
      .get(function (req, res) {
         CardHandler.shuffle();
         res.json(CardHandler.pack);
      });
   
   app.route('/deal')
      .get(function (req, res) {
         CardHandler.players[0] = 3;
         CardHandler.dealHands();
         res.json(CardHandler.hands);
      });
      
   app.route('/dealFlop')
      .get(function (req, res) {
         CardHandler.dealFlop();
         res.json(CardHandler.flop);
      });
      
   app.route('/dealTurn')
      .get(function (req, res) {
         CardHandler.dealTurn();
         res.json(CardHandler.turn);
      });
      
   app.route('/dealRiver')
      .get(function (req, res) {
         CardHandler.dealRiver();
         res.json(CardHandler.river);
      });

   app.route('/api/clicks')
      .get(clickHandler.getClicks)
      .post(clickHandler.addClick)
      .delete(clickHandler.resetClicks);
};
