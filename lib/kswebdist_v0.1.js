const fs = require("fs");
const UglifyJS = require("uglify-js");

const rootDir = __dirname + "\\..\\";

const libPath = rootDir + "\\lib";
const libFiles = fs.readdirSync(libPath);
for(let i = 0; i < libFiles.length; i++) {
    const name = libFiles[i];
    const filepath = libPath + "\\" + name;
    if (filepath === __filename) continue;
    console.log(filepath);
    console.log(__filename);
    // const content = fs.readFileSync(libPath + "/" + name, "utf8");
    // console.log(content);
}
