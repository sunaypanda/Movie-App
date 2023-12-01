const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { searchTerm, page, sortOrder } = JSON.parse(event.body);

  const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.OMDB_API_KEY}&s=${searchTerm}&page=${page}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
