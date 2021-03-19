const colors = require("colors");

const getTitle = (title, color) => {
  return `${colors.black[`bg${color}`](` ${title} `)} `;
};

const getNotify = (title, message, color) => {
  return `${title ? getTitle(title, color) : ""}${colors[
    title ? "bold" : "reset"
  ][color.toLowerCase()](message)}`;
};

const warning = (title, message) => {
  console.info(getNotify(title, message, "Yellow"));
};

const success = (title, message) => {
  console.info(getNotify(title, message, "Green"));
};

module.exports = {
  warning,
  success,
};
