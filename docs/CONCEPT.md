# dwncrwlr_js - CONCEPT

This is a concept about developing a simple and small command line tool to parse files written in *Markdown* to convert them into *HTML* files.

- [dwncrwlr_js - CONCEPT](#dwncrwlrjs---concept)
    - [Intention](#intention)
    - [Use Cases](#use-cases)
        - [Input parameter](#input-parameter)
        - [Output parameter](#output-parameter)
    - [Toolset](#toolset)
        - [Mardown parser](#mardown-parser)
        - [Application arguments / Command line parser](#application-arguments--command-line-parser)

---

## Intention

For any web view purpose a simple tool to convert *Markdown* valid text to valid *HTML* is needed. Alls **Use Cases** are described in the following sections.

## Use Cases

### Input parameter

The usage of the tool should be not be limited to any workspace or location. Therefore an input parameter is needed to specify a `path` and a `filename`. 

### Output parameter

To save the parsed and generated destination file to any desired place a parameter which provides to set the output `path` and a `filename` is needed.

## Toolset

### Mardown parser

1. Showdown

### Application arguments / Command line parser

1. NodeJs Standard:
    - Normal NodeJs app standard without any additional tool 
    - Example:
        ```
        var args = process.argv.slice(2);
        ```

2. Minimist 
    - For minimal argument parsing

3. Commander.js 
    - Most adopted module for argument parsing

4. Meow
    - Lighter alternative to Commander.js

5. Yargs
    - More sophisticated argument parsing (heavy)

6. Vorpal.js
    - Mature / interactive command-line applications with argument parsing.