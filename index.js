const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt ([
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
]);
}

async function init() {
    console.log("hi")
    try {
      const answers = await promptUser();
  
      const html = generateHTML(answers);
  
      await writeFileAsync(`${answers.name}.html`, html);
  
      console.log("Successfully wrote to index.html");
    } catch(err) {
      console.log(err);
    }
  }
  
  init();
  
