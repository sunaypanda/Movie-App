const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  console.log("Function invoked");

  try {
    const { searchTerm, page, sortOrder } = JSON.parse(event.body);

    const apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.OMDB_API_KEY}&s=${title}&page=${page}`;

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
    console.log("Function code executed");
  } catch (error) {
    console.error("Error in function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
