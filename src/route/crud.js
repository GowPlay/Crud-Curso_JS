const express = require('express');
const router = express.Router();

const pool = require('../db');

router.get('/add', async  (req , res) =>{
    const articulo = await pool.query('SELECT * FROM articulo');
    res.render('partial/index' , {articulo});
});
router.post('/addarticulo', async (req , res) => {
    const {nombre, img, categoria, descripcion} = req.body;
    const newArticulo = {
        nombre,
        img,
        categoria,
        descripcion,
    };
    console.log(newArticulo);
    await pool.query('INSERT INTO articulo set ?', [newArticulo]);
    res.redirect('/Gowplay/add');
});

router.get('/delete/:id', async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM articulo WHERE id = ?', [id]);
    res.redirect('/Gowplay/add');
});
router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const articulos = await pool.query('SELECT * FROM articulo WHERE id =?', [id]);
    res.render('partial/edit', {articulo: articulos[0]});
});

router.post('/edit/:id', async (req, res) => {
    const {nombre, img, categoria, descripcion} = req.body;
    const {id} = req.params;
    const newArticulo = {
        nombre,
        img,
        categoria,
        descripcion,
    };
    await pool.query('UPDATE  articulo set ? WHERE id = ?', [newArticulo, id]);
    res.redirect('/Gowplay/add');
});

module.exports = router;