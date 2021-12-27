import axios from 'axios';

const MAIN_URL = 'https://statsapi.web.nhl.com/api/v1/';

export default async function fetchGames(startDate, endDate) {
  const { data } = await axios.get(`${MAIN_URL}schedule?teamId=16&startDate=${startDate}&endDate=${endDate}`);
  return data;
}
