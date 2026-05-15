const express = require("express");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const tasks = [];

const getTaskIndex = (taskId) => tasks.findIndex(({ id }) => id === taskId);
const getTaskById = (taskId) => tasks.find(({ id }) => id === taskId);

app.get("/", (_req, res) => {
    res.render("dashboard", { tasks });
});

app.get("/add", (_req, res) => {
    res.render("add-task");
});

app.post("/add-task", (req, res) => {
    const task = {
        id: Number(req.body.id),
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status
    };

    tasks.push(task);
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const taskIndex = getTaskIndex(taskId);

    if (taskIndex >= 0) {
        tasks.splice(taskIndex, 1);
    }

    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const task = getTaskById(taskId);

    res.render("edit-task", { task });
});

app.post("/update", (req, res) => {
    const taskId = Number(req.body.id);
    const task = getTaskById(taskId);

    if (task) {
        Object.assign(task, {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status
        });
    }

    res.redirect("/");
});

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
        return;
    }

    console.log(`Server running on port: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
