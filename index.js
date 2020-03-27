const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

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

    // Gets the answers into small const variables
    // Also gets the badge url from user input
    const name = answers.username
    const badgeTitle = answers.badgeTitle
    const badgeColor = answers.badgeColor
    const badgeURL = `https://img.shields.io/badge/${badgeTitle}-${badgeColor}`;
    
    // Makes the axios call to github
    // grabbing the username, profile pic, and email
    const queryURL = `https://api.github.com/users/${name}`;
    axios.get(queryURL).then(function(res){
      const avatar = res.data.avatar_url
      let email = res.data.email
      if (email == null){
        email = "No email displayed"
      }

    // What the html page will look like
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
    <div class="container">
      <h1 class="display-4">${name}</h1>
      <img src="${badgeURL}"></img>
      <img src="${avatar}"></img>
      <h2>${email}</h2>
    

    </div>
  </body>
  </html>`;

// Writes the info to the html file, giving it a unique name


const generateHTML = `${name}.html`
fs.writeFile(generateHTML, HTML, function (err) {
    if (err) {
        console.log(err);
    }
})
})
})