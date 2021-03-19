// console-log-checker-ignore -> no checking for this file

const jsLikeExtensions = ["js", "ts", "jsx", "tsx"];

/**
 * Checks if provided fileName has extensions listed on
 * `jsLikeExtensions` array
 * @param {string} fileName
 * @returns {boolean} hasJsExtension
 */
const checkJsExtension = (fileName) => {
  const extMatch = fileName.match(/.[0-9a-z]$/);
  return extMatch !== null ? jsLikeExtensions.includes(extMatch[0]) : false;
};

/**
 * Checks if provided content has console.log or is ignored
 * @param {string} content to be checked
 * @returns
 */
const checkIfHasLog = (content) => {
  const isIgnored = content.indexOf("console-log-checker-ignore") >= 0;
  return !isIgnored && content.indexOf("console.log(") >= 0;
};

module.exports = {
  checkJsExtension,
  checkIfHasLog,
};
