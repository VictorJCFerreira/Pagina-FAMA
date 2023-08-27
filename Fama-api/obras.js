const fs = require('fs');

fs.readFile('./obras.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro:', err);
    return;
  }
  
  const jsonData = JSON.parse(data);
  console.log(jsonData);
  
  const item1Lista1 = jsonData.listaPrincipal[0].itens[0];
  console.log(item1Lista1); // Saída: "Item 1"
 
});
