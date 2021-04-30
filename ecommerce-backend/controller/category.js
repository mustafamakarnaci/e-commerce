const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');


// categoryById
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category is does not exist'
            });
        }
        req.category = category;
        next();
    })
};


// rread
exports.read = (req, res) => {
    return res.json(req.category);
}

// update
exports.update = (req, res) => {
    console.log(req);

    const category = req.category
    category.name = req.body.name

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    })
}

// remove
exports.remove = (req, res) => {

    console.log(req);

    const category = req.category

    category.delete((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data, message: "Category deleted" });
    })
}

// list
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( data );
    })
}

// create
exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( data );
    })
}

