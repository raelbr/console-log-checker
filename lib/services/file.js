const execa = require("execa");
const fs = require("fs");
const { checkJsExtension, checkIfHasLog } = require("./check");
const notify = require("./notify");

/**
 * Returns the root of the git repository
 * @returns {string} rootPath
 */
const getGitRootPath = execa("git", ["rev-parse", "--show-toplevel"])
  .then(({ stdout }) => stdout)
  .catch(() => {
    notify.warning("warn", "Unable to find git root");
    return ".";// return current directory
    }
  );

/**
 * Returns a list of files from git status, which
 * is NOT untracked, deleted or renamed
 * @returns {Promise<array>} fileList
 */
const getFileList = () =>
  new Promise(async (res, rej) => {
    const rootPath = await getGitRootPath;
    execa("git", ["status", "-s", "--porcelain", "-v", "-uno", "--no-renames"])
      .then(({ stdout }) => {
        const resultList = stdout.split("\n");
        res(
        resultList.reduce((list, staged) => {
            const isDeleted = staged.substring(0, 3).indexOf("D") >= 0;
            const fileName = staged.substring(3);
            const isJsFile = !!fileName && checkJsExtension(fileName);
            return isDeleted || !isJsFile ? list : [...list, `${rootPath}/${fileName}`];
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
 * @returns {Promise<string>} file content
 */
const readFile = (path) =>
  new Promise((res, rej) => {
    fs.readFile(path, "utf8", (err, fileContent) => {
      if (err) rej(err);
      else res(fileContent);
    });
  });

/**
 * Returns the list of file path that contains log:
 * @returns {Promise<array>} filePath list
 */
const getFilesWithLog = async () => {
  try {
    const files = await getFileList();
    const result = await Promise.all(
      files.map(async (filePath) => {
        const fileContent = await readFile(filePath);
        const relativeFilePath = filePath.replace(`${await getGitRootPath}/`, "");
        return checkIfHasLog(fileContent) ? relativeFilePath : null;
      })
    );
    return result.filter((filePath) => filePath !== null);
  } catch (err) {
    notify.error("error", "An error has occurred!");
    console.error(err);
    return [];
  }
};

module.exports = {
  getFileList,
  readFile,
  getFilesWithLog,
};
