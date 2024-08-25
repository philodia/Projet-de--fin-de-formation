const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_TRANSACTION_SUCCESS':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        loading: false,
      };
    case 'ADD_TRANSACTION_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'REMOVE_TRANSACTION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'REMOVE_TRANSACTION_SUCCESS':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
        loading: false,
      };
    case 'REMOVE_TRANSACTION_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default transactionReducer;