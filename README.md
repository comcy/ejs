# CnvrtdwnJs

> cnvrtdwn_js gives the possibility to read in markdown written texts and print them out as a html file.
 
[![GitHub](https://img.shields.io/badge/License-MIT-blue.svg?longCache=true&style=for-the-badge)](https://github.com/comcy/cnvrtcrwlr_js/blob/master/LICENSE)


---

## Table of Contents

- [CnvrtdwnJs](#cnvrtdwnjs)
    - [Table of Contents](#table-of-contents)
    - [Example](#example)
    - [Installation](#installation)
        - [Clone](#clone)
        - [Setup](#setup)
    - [Features](#features)
    - [Usage](#usage)
    - [Documentation](#documentation)
    - [Tests](#tests)
    - [Contributing](#contributing)
    - [License](#license)

---

## Example

```shell
cnvrtdwn -i ./path/to/my/README.md -o ./README.html 
```

---

## Installation

1. Install the package global or to your devDependencies

```shell
$ npm install -g | --save | --save-dev cnvrtdwn-js
```

### Clone

Clone this repo to your local machine using `https://github.com/comcy/cnvrtcrwlr_js.git`

### Setup

Install npm packages

```shell
$ npm install
```

---

## Features

Planned features:

1. More intelligent argument parsing
2. Improve docs
3. Add tests
4. Error handling
5. Preparation for static site generator

## Usage

If you want to use the tool during a build process modify your *package.json* by adding a *cnvrtdwn* script to the scripts section


`package.json`
```json
  ...
  "scripts": {
      ...
      "cnvrtdwn": "index.js"
  },
  ...
```

## Documentation

TODO: Show docs

## Tests

TODO: Add tests

---

## Contributing

Commit issues under: https://github.com/comcy/cnvrtcrwlr_js/issues

Feel free to improve code via *Pull Requests*.

---

## License

[![GitHub](https://img.shields.io/badge/License-MIT-blue.svg?longCache=true&style=for-the-badge)](https://github.com/comcy/cnvrtcrwlr_js/blob/master/LICENSE)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2018 © Christian Silfang
