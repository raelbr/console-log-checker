const { readFile, getFileList } = require("./services/file");
const { checkIfHasLog } = require("./services/check");

// ---

const init = async () => {
  const files = await getFileList();
  return files.filter(async (filePath) => {
    const fileContent = await readFile(filePath);
    return checkIfHasLog(fileContent);
  });
};

init().then((result) => {
  console.info(result);
});

module.exports = init;
