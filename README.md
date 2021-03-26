# console-log-checker

The main goal for this package is to be used with git hooks like pre-commit or pre-push to prevend `console.log` debugging in your code.

We recommend to use this package with husky.

### How to use

#### 1. Install console-log-checker and husky

`npm install --save-dev husky console-log-checker`

or

`yarn add husky console-log-checker --dev`

#### 2. Active husky hooks:

`npx husky install`

or

`yarn husky install`

#### 3. Add husky hook for console-log-checker:

`npx husky add .husky/pre-commit "npx console-log-checker"`

or

`yarn husky add .husky/pre-commit "npx console-log-checker"`

You are ready to go!
