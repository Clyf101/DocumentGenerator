const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');

// array of questions for user
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Please provide installation instructions for your project:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Please provide usage information for your project:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Which license would you like to use for your project?',
    choices: ['MIT', 'GNU GPLv3', 'Apache License 2.0', 'ISC'],
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Please provide contribution guidelines for your project:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Please provide testing instructions for your project:',
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
  },
];

// function to generate README
function generateREADME(answers, userData) {
  return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
[![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-yellow.svg)](https://opensource.org/licenses/${answers.license})
This project is licensed under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
If you have any questions about the repo, please open an issue or contact me directly at ${answers.email}. You can find more of my work at [${userData.login}](${userData.html_url}).
`;
}

// function to initialize program
function init() {
  // prompt user for information
  inquirer
    .prompt(questions)
    .then((answers) => {
      // make API request to GitHub for user information
      axios
        .get(`https://api.github.com/users/${answers.github}`)
        .then((response) => {
          // generate README using user input and GitHub API data
          const README = generateREADME(answers, response.data);
          // write README to file
          fs.writeFile('README.md', README, (err) =>
            err ? console.error(err) : console.log('README created!')
          );
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

// call init function to start program
init();
