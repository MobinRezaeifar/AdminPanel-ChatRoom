// reducers.js

import { RECEIVE_MESSAGES } from './actions';

const initialState = {
  Registers: [],
  Messages: [],
  userMessages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case RECEIVE_MESSAGES:
      return {
        ...state,
        userMessages: action.payload,
      };

    case "ADD_REGISTER_SUCCESS":
      return {
        ...state,
        Registers: [...state.Registers, action.payload],
      };

    case "FETCH_REGISTERS_SUCCESS":
      return {
        ...state,
        Registers: action.payload,
      };

    case "UPDATE_REGISTER_SUCCESS":
      return {
        ...state,
        Registers: state.Registers.map((Register) =>
          Register.id === action.payload.id ? action.payload : Register
        ),
      };

    case "DELETE_REGISTER_SUCCESS":
      return {
        ...state,
        Registers: state.Registers.filter(
          (Register) => Register.id !== action.payload
        ),
      };

    case "ADD_MESSAGE_SUCCESS":
      return {
        ...state,
        Messages: [...state.Messages, action.payload],
      };

    case "FETCH_MESSAGES_SUCCESS":
      return {
        ...state,
        Messages: action.payload,
      };

    case "UPDATE_MESSAGE_SUCCESS":
      return {
        ...state,
        Messages: state.Messages.map((Message) =>
          Message.id === action.payload.id ? action.payload : Message
        ),
      };

    case "DELETE_MESSAGE_SUCCESS":
      return {
        ...state,
        Messages: state.Messages.filter(
          (Message) => Message.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default reducer;
