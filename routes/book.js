const express = require("express");
const upload = require("../utils/upload.js");

const Book = require("../models/book");
const Author = require("../models/author");

const router = express.Router();
router.get('/', (req, res) => {
    Book.find().then(resultado => {
        res.render('books', { books: resultado});
    }).catch (error => {
    }); 
});

// Formulario de nuevo book
router.get('/new', (req, res) => {
    res.render('new_book');
});

// Formulario de edición de book
router.get('/edit/:id', (req, res) => {
    Book.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('edit_book', {book: resultado});
        } else {
            res.render('error', {error: "Book no encontrado"});
        }
    }).catch(error => {
        res.render('error', {error: "Book no encontrado"});
    });
});

// Ficha de book
router.get('/:id', (req, res) => {
    Book.findById(req.params.id).then(resultado => {
        if (resultado)
            res.render('book_info', { book: resultado});
        else    
            res.render('error', {error: "Book no encontrado"});
    }).catch (error => {
    }); 
});

// Insertar books
router.post('/', upload.upload.single('cover'), (req, res) => {
    console.log("REQ BODY");
    console.log(req.body);
    console.log();
    let nuevoLibro = new Book({
        title: req.body.title,
        editorial: req.body.editorial,
        price: req.body.price
    });
    if (req.file)
        nuevoLibro.cover = req.file.filename;

    console.log("NUEVLIBRO");
    console.log(nuevoLibro);
    console.log();
    nuevoLibro.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        console.log(error.errors);
        let errors = {
            general: 'Error insertando book'
        };
        if(error.errors.title)
        {
            errors.title = error.errors.title.message;
            console.log(error.errors.title);
        }
        if(error.errors.price)
        {
            errors.price = error.errors.price.message;
        }

        res.render('new_book', {errors: errors, data: req.body});
    });
});

// Borrar books
router.delete('/:id', (req, res) => {
    Book.findOneAndDelete({ _id: req.params.id}).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', {error: "Error borrando book"});
    });
});

// Modificar books
// Lo definimos como "POST" para integrarlo mejor en un formulario multipart
router.post('/:id', upload.upload.single('cover'), (req, res) => {
    // Buscamos el book y cambiamos sus data
    Book.findById(req.params.id).then(resultado => {
        if (resultado)
        {
            resultado.title = req.body.title;
            resultado.editorial = req.body.editorial;
            resultado.price = req.body.price;
            // Si viene una cover, la cambiamos
            if(req.file)
                resultado.cover = req.file.filename;
            resultado.save().then(resultado2 => {
                res.redirect(req.baseUrl);
            }).catch(error2 => {
                let errors = {
                    general: 'Error editando book'
                };
                if(error2.errors.title)
                {
                    errors.title = error2.errors.title.message;
                }
                if(error2.errors.price)
                {
                    errors.price = error2.errors.price.message;
                }
        
                res.render('edit_book', {errors: errors, 
                    book: { id: req.params.id, title: req.body.title, 
                        editorial: req.body.editorial, price: req.body.price}});
                });        
        }
        else    
            res.render('error', {error: "Book no encontrado"});
    }).catch (error => {
        res.render('error', {error: "Error editando book"});
    }); 
});

module.exports = router;