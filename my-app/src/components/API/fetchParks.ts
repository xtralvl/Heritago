import { useContext } from "react";
import SearchedCountryOrState from "../../context/SearchedCountryOrStateContext";

const myApiKey = "od5RIysPVukEVOhEVpB8rAZDi4yCv0vwRoCCBnod";
const BASE_URL = "https://developer.nps.gov/api/v1/parks";

export async function fetchParks() {
  try {
    const response = await fetch(`${BASE_URL}?limit=474&api_key=${myApiKey}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log(data.data)
    return data.data; // array of parks

  } catch (error) {
    console.error("Error fetching parks:", error);
    return [];
  }
}

export async function fetchTopSixParks() {
  try {
    const parkCodes = ["yose", "zion", "grca", "yell", "romo", "glac"];
    const res = await fetch(`${BASE_URL}?parkCode=${parkCodes.join(",")}&api_key=${myApiKey}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data.data; // ✅ this will be your 5 parks array

  } catch (error) {
    console.error("Error fetching top 5 parks:", error);
    return [];
  }
}
