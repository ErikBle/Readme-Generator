const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");


const questions = [{
    message: "Enter your GitHub username",
    name: "username"
},{
    message: "Create the title of your badge",
    name: "badgeLabel"
},{ 
    type: 'list',
    message: "Choose the color of your badge",
    name: "badgeColor",
    choices: ["green", "yellow", "orange", "red", "blue"]
},
];


