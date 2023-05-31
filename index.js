const fs = require("fs");
const readline = require("readline");

const checkCommand = require("./utils/checkCommand");
const autoDetechSepo = require("./utils/autoDetechSepo");

const convertCsvToJson = () => {
  const { sourseFilePath, resultFilePath, sepo } = checkCommand(
    process.argv,
    ".csv"
  );

  const readStream = fs.createReadStream(sourseFilePath);
  const readerStream = readline.createInterface({ input: readStream });
  const writeStream = fs.createWriteStream(resultFilePath);
  const seporator = sepo ? sepo : autoDetechSepo();

  const arrData = [];

  readerStream.on("line", (row) => arrData.push(row));

  readerStream.on("close", () => {
    const nameLine = arrData[0];
    const transformLine = nameLine.split(seporator);
    const data = arrData.reduce((acc, item, index) => {
      if (index !== 0) {
        const transformItem = item.split(seporator);
        const transformObj = transformLine.reduce((obj, el, i) => {
          obj[el] = transformItem[i];
          return obj;
        }, {});
        acc.push(transformObj);
      }

      return acc;
    }, []);
    writeStream.write(JSON.stringify(data));
  });
};

const convertJsonToCsv = () => {
  const { sourseFilePath, resultFilePath, sepo } = checkCommand(
    process.argv,
    ".json"
  );
  const readStream = fs.createReadStream(sourseFilePath);
  const readerStream = readline.createInterface({ input: readStream });
  const writeStream = fs.createWriteStream(resultFilePath);
  const seporator = sepo ? sepo : autoDetechSepo();

  readerStream.on("line", (input) => {
    const parseValue = JSON.parse(input);
    const stringValue = parseValue.reduce((str, item, index) => {
      if (index === 0) {
        str = str + Object.keys(item).join(seporator) + "\r";
      }

      str = str + Object.values(item).join(seporator) + "\r";

      return str;
    }, "");

    writeStream.write(stringValue);
  });
};

module.exports.convertCsvToJson = convertCsvToJson;
module.exports.convertJsonToCsv = convertJsonToCsv;
