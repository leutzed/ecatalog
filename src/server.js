const express = require('express');
const app = express();

const products = [
    { id: 1, name: 'nome 1' },
    { id: 2, name: 'nome 2' },
    { id: 3, name: 'nome 3' },
    { id: 4, name: 'nome 4' },
    { id: 5, name: 'nome 5' },
    { id: 6, name: 'nome 6' },
    { id: 7, name: 'nome 7' },
    { id: 8, name: 'nome 8' },
    { id: 9, name: 'nome 9' },
    { id: 10, name: 'nome 10' },
    { id: 11, name: 'nome 11' }
]

app.get('/products', paginatedResults(products), (req, res) => {
    res.json(res.paginatedResults);
})

function paginatedResults(model){
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const results = {}
    
        if (endIndex < model.length){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        if (startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }    
        }
        
    
        results.results = model.slice(startIndex, endIndex);

        res.paginatedResults = results;
        next();
    }
}

app.listen(3000);
