const fs = require("fs");
const UglifyJS = require("uglify-js");
const rootDir = require("path").resolve(__dirname + "\\..\\").replaceAll("\\", "/");

const uglifyMap = [];

// Loop through all the files in lib and uglify them
const libPath = rootDir + "/lib";
const libFiles = fs.readdirSync(libPath);
for(let i = 0; i < libFiles.length; i++) {
    const name = libFiles[i];
    const path = libPath + "/" + name;
    if (path === __filename.replaceAll("\\", "/")) continue; // Do not uglify this script itself
    const content = fs.readFileSync(libPath + "/" + name, "utf8");
    const uglified = UglifyJS.minify(content);
    uglifyMap.push({ name, path: path.replace(rootDir, ""), code: uglified.code });
}

// Recreate the dist folder and its structure, and write output files
const distDir = rootDir + "/dist";
if (fs.existsSync(distDir))
    fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir);
fs.mkdirSync(distDir + "/lib");
for(let i = 0; i < uglifyMap.length; i++) {
    const path = uglifyMap[i].path;
    const code = uglifyMap[i].code;
    fs.writeFileSync(distDir + path, code);
}

console.log("Build completed in /dist folder");