const http = require('http');
const fs = require("fs");
const urlLib = require('url')
const path = require('path')

const server = http.createServer((req, res) => {
    const { headers, url, method } = req;

    if (url === '/') {
        fs.readFile("./src/home.html", "utf8", (error, data) => {
            if (error) {
                res.statusCode = 500;
                res.write("<h1>Error not found</h1>")
                res.end()
            } else {
                res.statusCode = 200;
                res.write(data);
                res.end()
            }
        })
    }
    else if (url === '/login') {
        fs.readFile("./src/login.html", "utf8", (error, data) => {
            if (error) {
                res.statusCode = 500;
                res.write("<h1>Error not found</h1>")
                res.end()
            } else {
                res.statusCode = 200;
                res.write(data);
                res.end()
            }
        })
    }
    else if (url === '/loginCheck' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const password = parsedBody.split('=')[2];
            if (password === 'Tengis12') {
                res.statusCode = 302;
                fs.writeFileSync("loginInfo.txt", parsedBody)
                res.setHeader("Location", "/home")
                console.log(parsedBody);
                res.end()
            } else {
                res.setHeader("Location", "/error")
                console.log(parsedBody);
                res.end()
            }
        })

    } else if (url === "/home") {
        fs.readFile("./src/home.html", "utf8", (error, data) => {
            if (error) {
                res.statusCode = 500;
                res.write("<h1>Error not found</h1>")
                res.end()
            } else {
                res.statusCode = 200;
                res.write(data);
                res.end()
            }
        })
    }
    else if (url === "/error") {
        fs.readFile("./src/error.html", "utf8", (error, data) => {
            if (error) {
                res.statusCode = 500;
                res.write("<h1>Error not found</h1>")
                res.end()
            } else {
                res.statusCode = 200;
                res.write(data);
                res.end()
            }
        })
    }else if(url.endsWith('jpg') || url.endsWith('png')){

        const parsed = urlLib.parse(url);
        const fileName = path.basename(parsed.pathname);
        console.log(fileName, "=====> fileName");

        fs.readFile('./src/img/' + fileName, (error, data) => {
            res.statusCode = 200;
            res.end(data)
        })
    }
    else {
        res.write("<h1>404 not found</h1>")
        res.end()
    }
})
server.listen(8000, () => {
    console.log('starting');
})