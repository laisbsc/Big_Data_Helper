/**
 * ineracts with the model
 */
const clients = require("./script");

// Create and Save a new Book
exports.clients.message.create = (req, res) => {
    //request validation
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty." });
        return;
    }

    //create a new book
    const bookstore = new Bookstore({
        theme: req.body.theme,
        author: req.body.author,
        title: req.body.title,
        genre: req.body.genre,
        price: req.body.price,
        published: req.body.published ? req.body.published : false
    });

    //save book to the DB
    bookstore
        .save(bookstore)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "An error has occurred while inserting the book into the list."
            });
        });
};

// Retrieve all books from the database using 'title' as condiditon from the Req.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Bookstore.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error has occured while retrieving tutorials."
            });
        });
};

// Find a single book with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Bookstore.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Book with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Book with ref. id= " + id});
            });
};

// Update a Title by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    Bookstore.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
       .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update item with id=${id}. Maybe Book could not be found.`
            });
          } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book item with id=" + id
            });
        });
  
};

// Delete a specified book with _id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Bookstore.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Book item with id=${id}. Maybe Book item could not be found!`
            });
        } else {
            res.send({
                message: "Book item was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Book item with id=" + id
        });
    });

};

// Delete all books from the database.
exports.deleteAll = (req, res) => {
    Bookstore.deleteMany({})
    .then(data => {
    res.send({
        message: `${data.deletedCount} Books were successfully deleted!`
    });
})
.catch(err => {
    res.status(500).send({
        message:
            err.message || "Some error occurred while removing all books. Please try again."
  });
});
};

// Find all published books - might not keep it
exports.findAllPublished = (req, res) => {
    Bookstore.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the published books."
            });
        });
};
