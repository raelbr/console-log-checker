const execa = require("execa");
const fs = require("fs");
const { checkJsExtension, checkIfHasLog } = require("./check");

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
            const isJsFile = !!fileName && checkJsExtension(fileName);
            return isDeleted || !isJsFile ? list : [...list, fileName];
          }, [])
        );
      })
      .catch((err) => {
        rej(err);
      });
  });

/**
 * Reads the provided file path and returns its content
 * @param {string} path
 * @returns {string} file content
 */
const readFile = (path) =>
  new Promise((res, rej) => {
    fs.readFile(path, "utf8", (err, fileContent) => {
      if (err) {
        rej(err);
      } else {
        res(fileContent);
      }
    });
  });

/**
 * Returns the list of file path that contains log:
 * @returns {array} filePath list
 */
const getFilesWithLog = async () => {
  const files = await getFileList();
  const result = await Promise.all(
    files.map(async (filePath) => {
      const fileContent = await readFile(filePath);
      return checkIfHasLog(fileContent) ? filePath : null;
    })
  );
  return result.filter((filePath) => filePath !== null);
};

module.exports = {
  getFileList,
  readFile,
  getFilesWithLog,
};
