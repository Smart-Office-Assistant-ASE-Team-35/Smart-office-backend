const request = require("request");

const getQuotes = async (req, res) => {
  const categories = req.body.categories;

  try {
    if (categories && categories.length > 0) {
      const cate_arr = categories.map((e) => {
        if (e.tagName === "reward-based") {
          e.tagName = "inspirational";
        } else if (e.tagName === "fear-based") {
          e.tagName = "fear";
        } else if (e.tagName === "creative") {
          e.tagName = "imagination";
        } else if (e.tagName === "achievement") {
          e.tagName = "success";
        } else if (e.tagName === "competence") {
          e.tagName = "knowledge";
        } else if (e.tagName === "incentive") {
          e.tagName = "motivational";
        }
        return e;
      });

      const arr = cate_arr.filter((e) => e.active === true);
      const random_category =
        arr[Math.floor(Math.random() * arr.length)].tagName;
      // const url = `https://famous-quotes4.p.rapidapi.com/random?category=${random_i}&count=1`;
      const options = {
        method: "GET",
        url: `https://famous-quotes4.p.rapidapi.com/random`,
        qs: { category: random_category, count: 1 },
        headers: {
          "X-RapidAPI-Key":
            "7a17c22a63mshc11b531d96e85f6p1ab50ajsnd11ce371d847",
          "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
          useQueryString: true
        }
      };

      request(options, (err, response, body) => {
        if (err) {
          res.send({ error: "Error, please try again" });
        } else {
          let quotes = JSON.parse(body);
          res.send(quotes);
        }
      });
    } else {
      res.send({ text: null });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getQuotes };
