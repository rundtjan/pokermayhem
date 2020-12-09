const getName = () => {
  return 'Jim';
};

var pack = ['AS', 'KS', 'QS', 'JS', '10S', '9S', '8S', '7S', '6S', '5S', '4S', '3S', '2S', 'AC', 'KC', 'QC', 'JC', '10C', '9C', '8C', '7C', '6C', '5C', '4C', '3C', '2C', 'AH', 'KH', 'QH', 'JH', '10H', '9H', '8H', '7H', '6H', '5H', '4H', '3H', '2H','AD', 'KD', 'QD', 'JD', '10D', '9D', '8D', '7D', '6D', '5D', '4D', '3D', '2D'];

var players = [0];

var hands = [];

var packIndex = [0];

var flop = [];

var turn = [];

var river = [];

var vastaavuus = {};

var setHandPw = (hand, pw) => {
    vastaavuus[pw] = hand
}

var shuffle = () => {
    packIndex = [0];
    hands.length = 0;
    flop.length = 0;
    turn.length = 0;
    river.length = 0;
    
   	var currentIndex = pack.length;
	   var temporaryValue, randomIndex;

	   // While there remain elements to shuffle...
	   while (0 !== currentIndex) {
		// Pick a remaining element...
		   randomIndex = Math.floor(Math.random() * currentIndex);
		   currentIndex -= 1;

		// And swap it with the current element.
		   temporaryValue = pack[currentIndex];
		   pack[currentIndex] = pack[randomIndex];
		   pack[randomIndex] = temporaryValue;
	   }
};

var dealHands = () => {
    hands.length = 0;
    var card = 0;
    console.log("pack", pack);
    console.log("players", players[0]);
    for (var i = 0; i < players[0]; i++){
        var tempArr = []
        tempArr.push(pack[card]);
        tempArr.push(pack[card+1])
        hands.push(tempArr.slice())
        card += 2;
    }
    packIndex[0] = packIndex[0] + 2*players[0];
}

var getHand = (pw) => {
    return hands[vastaavuus[pw]]
}

var dealFlop = () => {
    flop.length = 0;
    flop.push(pack[packIndex[0]])// = [, pack[packIndex[0]+1], pack[packIndex[0]+2]]
    flop.push(pack[packIndex[0]+1])
    flop.push(pack[packIndex[0]+2])
    packIndex[0] = packIndex[0]+3;
}

var dealTurn = () => {
    turn.length = 0;
    turn.push(pack[packIndex[0]])// = []
    packIndex[0] = packIndex[0]+1;
}

var dealRiver = () => {
    river.length = 0;
    river.push(pack[packIndex[0]])// = []
    packIndex[0] = packIndex[0]+1;
}

module.exports.getName = getName;
module.exports.shuffle = shuffle;
module.exports.pack = pack;
module.exports.players = players;
module.exports.hands = hands;
module.exports.dealHands = dealHands;
module.exports.packIndex = packIndex;
module.exports.dealFlop = dealFlop;
module.exports.flop = flop;
module.exports.dealTurn = dealTurn;
module.exports.turn = turn;
module.exports.dealRiver = dealRiver;
module.exports.river = river;
module.exports.setHandPw = setHandPw;
module.exports.getHand = getHand;