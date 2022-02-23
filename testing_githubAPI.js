const papa = require("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js");

const getUserData = async () => {
  github_url =
    "https://api.github.com/repos/MoH-Malaysia/covid19-public/contents/epidemic/case_states.csv";
  const response = await fetch(github_url, {
    method: "get",
    headers: {
      "content-type": "charset=UTF-8",
    },
  });
  const data = await response.text().then(papa.parse());
  console.log(data);
  /*papa.parse(github_url, {
    complete: function (results) {
      console.log(results);
    },
  });*/
};
getUserData();
