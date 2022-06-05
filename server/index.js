const express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/../client/dist'));



app.get('/', (req, res) => {
  if(err) {
    console.log('err', err);
  } else {
    console.log('Hello!');
    res.send('hello!');
  }
})




let port = 3001;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});