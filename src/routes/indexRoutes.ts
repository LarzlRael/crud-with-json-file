import { Router, Request, Response } from 'express';
import fs from 'fs'
const router = Router();
import uuid from 'uuid/v4';

//leyendo el archivo y guardando en nuestro 
const jsonBooks = fs.readFileSync('src/book.json', 'utf-8');
let books = JSON.parse(jsonBooks);


router.get('/', (req: Request, res: Response) => {
    res.render('index.ejs', {
        books
    })
})

router.get('/new-Entry', (req: Request, res: Response) => {
    res.render('new-entry.ejs')

})
router.post('/new-Entry', (req: Request, res: Response) => {
    console.log(req.body);
    const { title, author, image, description } = req.body;
    let newBook = {
        id: uuid(),
        title,
        author,
        image,
        description
    }
    if (!title || !author || !image || !description) {
        res.status(404).send('error entradas vacias');
    }
    books.push(newBook);
    //estas 2 lienas escriben 
    const jsonBooks = JSON.stringify(books);
    fs.writeFileSync('src/book.json', jsonBooks, 'utf-8');
    res.redirect('/')

})

router.get('/delete/:id', (req: Request, res: Response) => {

    books  = books.filter((book: { id: string; }) => book.id != req.params.id);
    fs.writeFileSync('src/book.json', jsonBooks, 'utf-8');
    res.redirect('/')

    res.send('recibido')
})

export default router;