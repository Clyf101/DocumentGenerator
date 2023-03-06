const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');

// array of questions for user
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    validate: function (input) {
      return input.length > 0 ? true : 'Please enter a valid title.';
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a description of your project:',
    validate: function (input) {
      return input.length > 0 ? true : 'Please enter a valid description.';
    },
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
    name: 'demo',
    message: 'live video of how the this project work',
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
    validate: function (input) {
      return input.length > 0 ? true : 'Please enter a valid GitHub username.';
    },
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
    validate: function (input) {
      return /\S+@\S+\.\S+/.test(input) ? true : 'Please enter a valid email address.';
    },
  },
];
function getLicenseText(license) {
  switch (license) {
    case 'MIT':
      return 'Licensed under the MIT license.';
    case 'GNU GPLv3':
      return 'Licensed under the GNU GPLv3 license.';
    case 'Apache License 2.0':
      return 'Licensed under the Apache License 2.0.';
    case 'ISC':
      return 'Licensed under the ISC license.';
    default:
      return '';
  }
}


// function to generate README
function generateREADME(answers, userData) {
  const licenseText = getLicenseText(answers.license);
  return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Demo](#demo)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${licenseText}

## Contributing
${answers.contributing}

## Demo Link
${answers.demo}

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
init();

