const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const questions = [
{
    message: "Enter your GitHub username",
    name: "username"
},{
    message: "Create the title of your badge",
    name: "badgeTitle"
},{ 
    type: 'list',
    message: "Choose the color of your badge",
    name: "badgeColor",
    choices: ["green", "yellow", "orange", "red", "blue"]
},
];

inquirer.prompt(questions).then(function(answers){

    const name = answers.username
    const badgeTitle = answers.badgeTitle
    const badgeColor = answers.badgeColor
    const badgeURL = `https://img.shields.io/badge/${badgeTitle}-${badgeColor}`;
    const HTML =
     `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>${name} Readme</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">${name}</h1>
      <h2><img src="${badgeURL}"</img></h2>
    </div>
  </div>
  </body>
  </html>`;
  
const generateHTML = `${name}.html`

fs.writeFile(generateHTML, HTML, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully wrote html");
    };
})
})
