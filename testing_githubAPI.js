const papa = require("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const getUserData = async () => {
  github_url =
    "https://api.github.com/repos/MoH-Malaysia/covid19-public/contents/epidemic/case_states.csv";
  const response = await fetch(github_url, {
    method: "get",
    headers: {
      "content-type": "charset=UTF-8",
      accept: "application/vnd.github.VERSION.raw",
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

const getUserData2 = async () => {
  github_url =
    "https://api.github.com/repos/MoH-Malaysia/covid19-public/contents/epidemic/cases_age.csv";
  const response = await fetch(github_url, {
    method: "get",
    headers: {
      "content-type": "charset=UTF-8",
      accept: "application/vnd.github.VERSION.raw",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
    });
};

//getUserData2();
