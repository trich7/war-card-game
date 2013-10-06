$(document).ready(function() {

	var cardModel = Backbone.Model.extend({
	  defaults: {
	    value: 0,
	    suit: '',
	    str_value: ''
	  },
	  
	});

	var cardView = Backbone.View.extend({
		tagName : 'div',
		template: _.template($('#card-template').html()),
		
		initialize: function() {
		},

	});

	function convert_value_to_string(value) {
		if (value > 10 || value < 2 ) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
				case 1:
				return 'Ace';
				break;
			}
		}
		return value.toString();
	}

	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	var my_deck = [];
	var opp_deck = [];
	
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			var ND = new cardModel ({ 
					value: j+1,
		    		suit: suit,
		    		str_value: convert_value_to_string(j+1),
				})
			deck.push(ND);
		}
	}

	$('.deal').click(function(){
		var deck_shuffled = _.shuffle(deck);
		my_deck = deck_shuffled.splice(0, deck_shuffled.length/2 );
		opp_deck = deck_shuffled;
	});

	function war(){
		var card_mine = my_deck[0];
		var card_opp = opp_deck[0];
		my_deck.splice(0,1);
		opp_deck.splice(0,1);
		if (card_mine.get('value') > card_opp.get('value')) {
			my_deck.push(card_mine, card_opp);
		} else {
			opp_deck.push(card_mine, card_opp);
		}	
		console.log(card_mine);
		console.log(card_opp);
	};

	var my_view = new cardView({
			el:$('#my-card'),
		});
	var opp_view = new cardView({
			el:$('#opp-card'),
		});

	$('.play').click(function(){
		war();
	});

});