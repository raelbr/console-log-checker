# console-log-checker

The main goal for this package is to be used with git hooks like pre-commit or pre-push to prevend `console.log` debugging in your code.

We recommend to use this package with husky.

### How to use

1. Install console-log-checker and husky

```
$ npm install --save-dev husky console-log-checker
```

2. Add console-log-checker on your package.json scripts:

```json
  "scripts": {
    "log-check": "console-log-checker",
  },
```

3. Add husky hook on your package.json:

```json
  "husky": {
    "hooks": {
      "pre-commit": "log-checker"
    }
  },
```

4. Init husky:

```
$ npx husky init
```

You are ready to go!
