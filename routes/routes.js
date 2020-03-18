var router = require("express").Router();
var Todo = require("../models/todo");

router.get("/", function (req, res) {
    var todos = Todo.find({}).then(function (results) {
        var todos = results.filter(function (todo) {
            return !todo.done;
        });

        var doneTodos = results.filter(function (todo) {
            return todo.done;
        });
        res.render("index", { todos: todos, doneTodos: doneTodos });
    });
});

//POST a new todo
router.post("/todos", function (req, res) {
    var newTodo = new Todo({ description: req.body.description });

    newTodo.save().then(function (todo) {
        console.log(todo);
        res.redirect("/");
    }).catch(function (err) {
        console.log(err.message);
        res.redirect("/");
    });
});

//POST handle Done Buttons
router.post("/todos/:id/completed", function (req, res) {
    var todoId = req.params.id;

    Todo.findById(todoId).exec().then(function (result) {
        result.done = !result.done;
        console.log(result.done);
        return result.save();
    }).then(function () {
        res.redirect("/");
    });
});

//DELETE a todo
router.delete("/todos/:id", function (req, res) {
    var todoId = req.params.id;

    Todo.findByIdAndRemove(todoId).exec().then(function (result) {
        console.log(result);
        res.redirect("/");
    });
});

module.exports = router;