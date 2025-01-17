const fs = require("fs");
const path = require("path");
const UglifyJS = require("uglify-js");

const rootDir = path.resolve(__dirname + "\\..\\");
const distDir = path.join(rootDir, "dist");
const ignoreList = [".git", ".gitignore", "node_modules", "dist", "ksbuild_v0.1.js"];

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
        // if this is a directory, copy directory and continue traversing
        if (fs.lstatSync(fullPath).isDirectory()) {
            fs.mkdirSync(dstPath);
            recursiveCopyAndUglify(fullPath);
        }
        // uglify "js" files and then copy to dist
        else if (path.extname(fullPath) === ".js") {
            const content = fs.readFileSync(fullPath, "utf8");
            const uglified = UglifyJS.minify(content);
            fs.writeFileSync(dstPath, uglified.code);
        }
        // uglify scripts in "html" file and then copy to dist
        else if (path.extname(fullPath) === ".html") {
            const content = fs.readFileSync(fullPath, "utf8");
            const splits = content.split("<script>");
            for(let i = 1; i < splits.length; i++) {
                const data = splits[i];
                const script = data.split("</script>")[0];
                const uglifiedScript = UglifyJS.minify(script);
                splits[i] = data.replace(script, uglifiedScript.code);
            }
            const uglifiedContent = splits.join("<script>");
            fs.writeFileSync(dstPath, uglifiedContent);
        }
        // for all other file types, just copy to dist
        else fs.copyFileSync(fullPath, dstPath);
    }
}
