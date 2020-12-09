'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');
var CardHandler = require(process.cwd() + '/app/controllers/cardHandler.js');

module.exports = function (app, db) {
   var clickHandler = new ClickHandler(db);
      
   app.route('/shuffle')
      .get(function (req, res) {
         CardHandler.shuffle();
         res.json(CardHandler.pack);
      });
   
   app.route('/deal/:players')
      .get(function (req, res) {
         CardHandler.players[0] = req.params.players;
         CardHandler.dealHands();
         res.json(CardHandler.hands);
      });
      
   app.route('/dealFlop')
      .get(function (req, res) {
         CardHandler.dealFlop();
         res.json(CardHandler.flop);
      });
      
   app.route('/getFlop')
      .get(function (req, res) {
         res.json(CardHandler.flop);
      });
      
   app.route('/getcards/:pw')
      .get(function(req, res){
         var json = {"owncards": CardHandler.getHand(req.params.pw), "flop": CardHandler.flop, "turn": CardHandler.turn, "river": CardHandler.river} 
         res.json(json)
      })
   
   app.route('/gethand/:pw')
      .get(function(req, res){
         console.log(CardHandler.getHand(req.params.pw))
         res.json(CardHandler.getHand(req.params.pw));         
      })
      
   app.route('/sethand/:hand/:pw')
      .get(function(req, res){
         //console.log(CardHandler.setHandPw(parseInt(req.params.hand), req.params.pw))
         if (CardHandler.setHandPw(parseInt(req.params.hand)-1, req.params.pw)) {res.send("set");}
         else {res.send("couldn't set")}
      })
      
   app.route('/dealTurn')
      .get(function (req, res) {
         CardHandler.dealTurn();
         res.json(CardHandler.turn);
      });
      
   app.route('/getTurn')
      .get(function (req, res) {
         res.json(CardHandler.turn);
      });
      
   app.route('/dealRiver')
      .get(function (req, res) {
         CardHandler.dealRiver();
         res.json(CardHandler.river);
      });
   
   app.route('/getRiver')
      .get(function (req, res) {
         res.json(CardHandler.river);
      });
   
   app.route('/player/:player')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });
   
   app.route('/dealer')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/dealer.html');
      });

   app.route('/api/clicks')
      .get(clickHandler.getClicks)
      .post(clickHandler.addClick)
      .delete(clickHandler.resetClicks);
};
