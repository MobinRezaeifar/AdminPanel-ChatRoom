export const addRegisterSuccess = (Register) => ({
  type: 'ADD_REGISTER_SUCCESS',
  payload: Register,
});

export const fetchRegistersSuccess = (Registers) => ({
  type: 'FETCH_REGISTERS_SUCCESS',
  payload: Registers,
});

export const updateRegisterSuccess = (updatedRegister) => ({
  type: 'UPDATE_REGISTER_SUCCESS',
  payload: updatedRegister,
});

export const deleteRegisterSuccess = (id) => ({
  type: 'DELETE_REGISTER_SUCCESS',
  payload: id,
});






export const addMessageSuccess = (Message) => ({
  type: 'ADD_MESSAGE_SUCCESS',
  payload: Message,
});

export const fetchMessagesSuccess = (Messages) => ({
  type: 'FETCH_MESSAGES_SUCCESS',
  payload: Messages,
});

export const updateMessageSuccess = (updatedMessage) => ({
  type: 'UPDATE_MESSAGE_SUCCESS',
  payload: updatedMessage,
});

export const deleteMessageSuccess = (id) => ({
  type: 'DELETE_MESSAGE_SUCCESS',
  payload: id,
});


// 
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  payload: messages,
});
// 

export const addRegister = (NewRegister) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://localhost:7063/api/Registers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(NewRegister),
      });

      const Register = await response.json();
      dispatch(addRegisterSuccess(Register));
    } catch (error) {
      console.error('Error adding register:', error);
    }
  };
};

export const fetchRegisters = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://localhost:7063/api/Registers');
      const Registers = await response.json();
      dispatch(fetchRegistersSuccess(Registers));
    } catch (error) {
      console.error('Error fetching register:', error);
    }
  };
};

export const updateRegister = (id, updateRegister) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://localhost:7063/api/Registers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateRegister),
      });

      const Register = await response.json();
      dispatch(updateRegisterSuccess(Register));
    } catch (error) {
      console.error(`Error updating register with ID ${id}:`, error);
    }
  };
};

export const deleteRegister = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`https://localhost:7063/api/Registers/${id}`, {
        method: 'DELETE',
      });

      dispatch(deleteRegisterSuccess(id));
    } catch (error) {
      console.error(`Error deleting register with ID ${id}:`, error);
    }
  };
};



export const addMessage = (NewMessage) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://localhost:7063/api/Messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(NewMessage),
      });

      const Message = await response.json();
      dispatch(addMessageSuccess(Message));
    } catch (error) {
      console.error('Error adding messages:', error);
    }
  };
};

export const fetchMessages = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://localhost:7063/api/Messages');
      const Messages = await response.json();
      dispatch(fetchMessagesSuccess(Messages));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
};

export const updateMessage = (id, updateMessage) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://localhost:7063/api/Messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateMessage),
      });

      const Message = await response.json();
      dispatch(updateMessageSuccess(Message));
    } catch (error) {
      console.error(`Error updating message with ID ${id}:`, error);
    }
  };
};

export const deleteMessage = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`https://localhost:7063/api/Messages/${id}`, {
        method: 'DELETE',
      });

      dispatch(deleteMessageSuccess(id));
    } catch (error) {
      console.error(`Error deleting message with ID ${id}:`, error);
    }
  };
};
