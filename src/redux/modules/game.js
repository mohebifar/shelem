import cards from 'cards';

export const LOAD = 'deck/LOAD';
export const LOAD_FOUR_CARDS = 'deck/LOAD_FOUR_CARDS';
export const THROW_CARD = 'deck/THROW_CARD';

const initialState = {
  deck: null,
  players: [],
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD:
      const players = [
        {
          position: 'top',
          name: 'اسمعیل',
          cards: []
        },
        {
          position: 'right',
          name: 'سعید',
          cards: []
        },
        {
          position: 'left',
          name: 'علی',
          cards: []
        },
        {
          position: 'bottom',
          name: 'محمد',
          cards: []
        }
      ];

      const deck = new cards.PokerDeck();
      deck.shuffleAll();

      for (let i = 0; i < 12; i++) {
        players[0].cards.push(null);
      }

      for (let i = 0; i < 12; i++) {
        players[1].cards.push(null);
      }

      for (let i = 0; i < 12; i++) {
        players[2].cards.push(null);
      }

      for (let i = 0; i < 12; i++) {
        players[3].cards.push(deck.draw());
      }

      return {
        ...state,
        deck,
        players
      };
    case LOAD_FOUR_CARDS:
      return {
        ...state
      };
    case THROW_CARD:
      action.player.cards[0] = action.card;
      return {
        ...state,
        players: [
          ...state.players
        ]
      };
    default:
      return state;
  }
}

export function load() {
  return {
    type: LOAD
  };
}

export function throwCard(card, player) {
  return {
    type: THROW_CARD,
    card,
    player
  };
}
