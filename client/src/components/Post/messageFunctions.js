import axios from "axios";

const getMessages = userId => {
  return axios.get(`/messages/sent/${userId}`);
};

export { getMessages };
