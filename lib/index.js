const { getFilesWithLog } = require("./services/file");
const notify = require("./services/notify");

const displayListOfFilesWithLog = (fileList) => {
  console.info();
  notify.warning("console.log", `found in ${fileList.length} files\n`);
  fileList.forEach((filePath) => {
    notify.warning(false, `  - ${filePath}`);
  });
};

// ---

const init = async () => {
  const filesWithLog = await getFilesWithLog();
  const hasConsoleLogs = filesWithLog.length;
  if (hasConsoleLogs) {
    displayListOfFilesWithLog(filesWithLog);
  } else {
    notify.success(false, "✓  No console.log found");
  }
  return hasConsoleLogs;
};

module.exports = init;
