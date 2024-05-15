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

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%DISCRIPTIONS%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/temp-overview.html`, 'utf8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/temp-product.html`, 'utf8');
const tempCard = fs.readFileSync(`${__dirname}/templates/temp-card.html`, 'utf8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');
const dataObj = JSON.parse(data);
// console.log(dataObj);

const server = http.createServer((req, res) => {
   
    const {pathname, query} = url.parse(req.url, true);
    console.log(url.parse(req.url, true));
   

    // overview page
    if (pathname === '/' || pathname ==='/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
        // replace the cards according to the json data
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);

    //product page
    } else if (pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const productHtml = replaceTemplate(tempProduct, dataObj[Number(query.id)]);
        res.end(productHtml)
        // api
    } else if (pathname === '/api'){
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

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to the requests on port 8000.');
})