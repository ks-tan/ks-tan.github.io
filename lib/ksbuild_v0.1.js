const fs = require("fs");
const path = require("path");
// const UglifyJS = require("uglify-js");

const rootDir = path.resolve(__dirname + "\\..\\");
const distDir = path.join(rootDir, "dist");
const ignoreList = [".git", ".gitignore", "node_modules", "dist"];

if (process.argv.includes("--clean")) {
    cleanDist();
    console.log("Removed /dist folder");
}
else {
    cleanDist();
    fs.mkdirSync(distDir);
    recursiveCopyAndUglify(rootDir);
    console.log("Build completed in /dist folder");
}

function cleanDist() {
    if (fs.existsSync(distDir))
        fs.rmSync(distDir, { recursive: true, force: true });
}

function recursiveCopyAndUglify(dir) {
    const files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (ignoreList.includes(file)) continue;
        const fullPath = path.join(dir, file);
        const dstPath = fullPath.replace(rootDir, path.join(rootDir + "/dist"));
        if (!fs.lstatSync(fullPath).isDirectory()) {
            fs.copyFileSync(fullPath, dstPath);
        } else {
            fs.mkdirSync(dstPath);
            recursiveCopyAndUglify(fullPath);
        }
    }
}
