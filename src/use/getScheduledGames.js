import axios from 'axios';

export default async function getGames(startDate, endDate) {
  try {
    const { data } = await axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=16&startDate=${startDate}&endDate=${endDate}`);
    return data;
  } catch (error) {
    return false;
  }
}
