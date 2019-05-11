import express from 'express';
import renderer from './helpers/renderer';
const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send(renderer());
});

app.listen(3030, () => {
  console.log('listening on PORT 3030')
});