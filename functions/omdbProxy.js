// omdbProxy.js

const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    const { title, page } = event.queryStringParameters;
    console.log(`Fetching data for title: ${title}, page: ${page}`);

    const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=4c32c503&s=${title}&page=${page}`;
    console.log(`API URL: ${API_URL}`);

    const response = await fetch(API_URL);
    const data = await response.json();

    console.log("Data received:", data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
