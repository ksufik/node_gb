const fs = require("fs");
const http = require("http");
const { join } = require("path");

const isFile = (path) => fs.lstatSync(path).isFile();

(async () => {

    const server = http.createServer((request, response) => {
        const filePath = join(process.cwd(), request.url.replace(/\[\.\.]/gi, '..'));
        if (!fs.existsSync(filePath)) {
            return response.end("Not Found");
        }

        if (isFile(filePath)) {
            return fs.createReadStream(filePath, 'utf-8').pipe(response);
        }

        const list = fs.readdirSync(filePath)
            .map(filename => [join(request.url, filename), filename])
            .map(([filepath, filename]) => `<li><a href="${filepath}">${filename}</a></li>`)
            .concat([
                `<li><a href="[..]/">..</a></li>`
            ])
            .join("");

        const html = fs
            .readFileSync(join(__dirname, "index.html"), "utf-8")
            .replace(/#links/gi, list);

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        response.end(html);
    }).listen(5555);

})();