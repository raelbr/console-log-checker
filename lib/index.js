const { getFilesWithLog } = require("./services/file");
const notify = require("./services/notify");

const displayListOfFilesWithLog = (fileList) => {
  const fileLabel = fileList.length > 1 ? "files" : "file";
  console.info();
  notify.warning("console.log", `found in ${fileList.length} ${fileLabel}\n`);
  fileList.forEach((filePath) => {
    notify.warning(false, `  - ${filePath}`);
  });
  console.info();
};

// ---

const init = async (config = {}) => {
  const filesWithLog = await getFilesWithLog();
  const hasConsoleLogs = filesWithLog.length;
  if (hasConsoleLogs) {
    displayListOfFilesWithLog(filesWithLog);
    process.exit(!!config.passiveMode ? 0 : 1);
  } else {
    notify.success(false, "\n✓  No console.log found\n");
    process.exit(0);
  }
  return hasConsoleLogs;
};

module.exports = init;
