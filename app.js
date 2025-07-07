const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/products', (req, res) => {
  // Получаем информацию от клиента какую страницу загрузить и сколько элементов
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  fs.readFile('products.json', (err, data) => {
    if(err) return res.status(500).send('Ошибка чтения страницы');
    
    const allProducts = JSON.parse(data);

    let start = (page - 1) * limit;
    let end = start + limit;
    let pageProducts = allProducts.slice(start, end);

    res.json({
      page,
      total: allProducts.length,
      products: pageProducts
    })
  });
});

app.listen(PORT, (err) => {
  if(err) return console.log('something wrong');
  console.log(`server work on http:/localhost:${PORT}`)
})