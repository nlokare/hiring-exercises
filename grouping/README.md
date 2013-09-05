# Programming Exercise - Grouping

The objective of this exercise is to identify rows in a CSV file that
may represent the __same person__ based on a provided **matching type**.

## Guidelines

* Use any language you want, as long as it can be compiled on OSX
* As usual, you can't use any code that you don't have license to use
* For the exercise, headers are considered to be consistant across files
* Tests are awesome

## Resources

### CSV Files

Two sample input files are included. Both files should be successfully
processed by the resuling code.

### Matching Types

A matching type is the name for an algorithm that is used to
compare rows.

For example: same_email would be an algo that matches rows based
on email columns

## Interface

At a high level, the program should take two parameters. The input file
and the matching type.

## Output

The expected output is a new CSV file that has rows marked with the id
that represents that group of rows.