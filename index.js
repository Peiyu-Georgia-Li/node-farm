const fs = require('fs');

// Blocking the coded execution
// const input = fs.readFileSync('./txt/input.txt', 'utf8');
// console.log(input);

// Non-blocking code execution
// fs.readFile('./txt/input.txt', 'utf8', (err, data) => {
//     console.log(data);
// });
// console.log('Reading file...');



// fs.readFile('./txt/start.txt','utf8',(err, data1) =>{
//     if (err) return console.log('Error 😡');

//     fs.readFile(`./txt/${data1}.txt`,'utf8',(err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('.txt/final.txt', `${data2}\n${data3}`, 'utf8', err =>{
//                 console.log('Your file has been written.');
//         });
//     });
// });
// });

// console.log('Will read files');


////////////////////////////////
// Server
const url = require('url');
const http =  require('http');

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;


    // overview page
    if (pathName === '/' || pathName ==='/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(tempOverview);

    //product page
    } else if (pathName === '/product'){
        res.end("This is the product")
        // api
    } else if (pathName === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data)
        // Not found
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
         
        });
        res.end('<h1>Page not found!</h1>')
    }

    res.end('Hello from the server');
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to the requests on port 8000.');
})