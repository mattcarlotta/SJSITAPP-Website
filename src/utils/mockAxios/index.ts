import MockAdapter from "axios-mock-adapter";
import axios, { avatarAPI } from "~utils/axiosConfig";

const mockAxios = new MockAdapter(axios);
export const mockAPI = new MockAdapter(avatarAPI);

export default mockAxios;
