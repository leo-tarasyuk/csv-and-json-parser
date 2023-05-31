const fs = require('fs');
const path = require('path');

const checkCommand = (argv, type) => {
    const [
        nodePath,
        runFilePath,
        sourseFileTag,
        sourseFilePath,
        resultFileTag,
        resultFilePath,
        seporatorTag,
        sepo
    ] = argv;
    const convertType = type === '.json' ? '.csv' : '.json'

    if (sourseFileTag !== "--sourceFile") {
        console.log("You need to add \"--sourceFile\" tag after running file");
        console.log("Example: - node csvToJson.js --sourceFile \"source.csv\" --resultFile \"result.json\"")
        process.exit(0);
    };

    try {
        fs.accessSync(sourseFilePath);
    } catch (err) {
        console.error(err);
        process.exit(0);
    };

    if (path.extname(sourseFilePath) !== type) {
        console.log(`You should convert from ${type} type file`);
        console.log("Example: - node csvToJson.js --sourceFile \"source.csv\" --resultFile \"result.json\"")
        process.exit(0);
    };

    if (resultFileTag !== "--resultFile") {
        console.log("You need to add \"--resultFile\" tag after the sourse.csv path");
        console.log("Example: - node csvToJson.js --sourceFile \"source.csv\" --resultFile \"result.json\"")
        process.exit(0);
    };

    try {
        fs.existsSync(path.dirname(resultFilePath));
    } catch (err) {
        console.error(err);
        process.exit(0);
    }

    if (path.extname(resultFilePath) !== convertType ) {
        console.log(`You should convert in ${convertType} type file`);
        console.log("Example: - node csvToJson.js --sourceFile \"source.csv\" --resultFile \"result.json\"")
        process.exit(0);
    };

    if (seporatorTag && seporatorTag !== "--seporator" && !sepo) {
        console.log("You need to write correctly seporator");
        console.log("Example: - node csvToJson.js --sourceFile \"source.csv\" --resultFile \"result.json\" --separator \",\"")
        process.exit(0);
    };

    return { sourseFilePath, resultFilePath, sepo };
};

module.exports = checkCommand;