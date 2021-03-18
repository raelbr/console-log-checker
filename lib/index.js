const execa = require("execa");

const jsLikeExtensions = ["js", "ts", "jsx", "tsx"];

const checkJsExtension = (fileName) => {};

/**
 * Returns a list of files from git status which
 * is NOT untracked, deleted or renamed
 * @returns {array} fileList
 */
const getFileList = () =>
  new Promise((res, rej) => {
    execa("git status -s --porcelain -v -uno --no-renames")
      .then(({ stdout }) => {
        const resultList = stdout.split("\n");
        res(
          resultList.reduce((list, staged) => {
            const isDeleted = staged.substring(0, 3).indexOf("D") >= 0;
            const fileName = staged.substring(3);
            const isJsFile = checkJsExtension(fileName);
            return isDeleted || isJsFile;
          }, [])
        );
      })
      .catch((err) => {
        rej(err);
      });
  });

const init = () => {};

module.exports = init;
