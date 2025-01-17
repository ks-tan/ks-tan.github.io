const fs = require("fs");
const path = require("path");
const UglifyJS = require("uglify-js");

const rootDir = path.resolve(__dirname + "\\..\\");
const distDir = path.join(rootDir, "dist");
const ignoreList = [".git", ".gitignore", "node_modules", "dist", "ksbuild_v0.1.js"];
let obfuscateFilePaths = [];

if (process.argv.includes("--clean")) {
    cleanDist();
    console.log("Removed /dist folder");
} else {
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
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const file = files[fileIndex];
        if (ignoreList.includes(file)) continue;
        const fullPath = path.join(dir, file);
        const dstPath = fullPath.replace(rootDir, path.join(rootDir + "/dist"));
        // if this is a directory, copy directory and continue traversing
        if (fs.lstatSync(fullPath).isDirectory()) {
            fs.mkdirSync(dstPath);
            recursiveCopyAndUglify(fullPath);
        }
        // uglify "js" files and then copy to dist with an obfuscated name
        else if (path.extname(fullPath) === ".js") {
            const content = fs.readFileSync(fullPath, "utf8");
            const uglified = UglifyJS.minify(content);
            if (!obfuscateFilePaths.includes(dstPath))
                obfuscateFilePaths.push(dstPath);
            const obfuscateFilePathIndex = obfuscateFilePaths.indexOf(dstPath);
            const filename = dstPath.split(/[\\/]/).slice(-1)[0];
            const obfuscatedDstPath = dstPath.replace(filename, obfuscateFilePathIndex + ".js");
            fs.writeFileSync(obfuscatedDstPath, uglified.code);
        }
        // uglify "html" file and then copy to dist
        else if (path.extname(fullPath) === ".html") {
            let content = fs.readFileSync(fullPath, "utf8");
            // uglify scripts in "html" file
            const splits = content.split("<script>");
            for(let i = 1; i < splits.length; i++) {
                const data = splits[i];
                const script = data.split("</script>")[0];
                const uglifiedScript = UglifyJS.minify(script);
                splits[i] = data.replace(script, uglifiedScript.code);
            }
            content = splits.join("<script>");
            // obfuscate name of imported local scripts
            const importedScriptElements = content.match(/<script src="(.*?)\.js"><\/script>/g);
            for(let i = 0; i < importedScriptElements.length; i++) {
                const element = importedScriptElements[i];
                const srcRelativePath = element.split(/["']/)[1];
                if (srcRelativePath.startsWith("http")) continue;
                const srcFullPath = path
                    .resolve(path.join(dir, srcRelativePath))
                    .replace(rootDir, distDir);
                if (!obfuscateFilePaths.includes(srcFullPath))
                    obfuscateFilePaths.push(srcFullPath);
                const obfuscateFilePathIndex = obfuscateFilePaths.indexOf(srcFullPath);
                const filename = srcFullPath.split(/[\\/]/).slice(-1)[0];
                const newSrcRelativePath = path
                    .relative(path.dirname(dstPath), srcFullPath)
                    .replace(filename, obfuscateFilePathIndex + ".js")
                    .replaceAll("\\", "/");
                content = content.replaceAll(srcRelativePath, newSrcRelativePath);
            }
            fs.writeFileSync(dstPath, content);
        }
        // for all other file types, just copy to dist
        else fs.copyFileSync(fullPath, dstPath);
    }
}
