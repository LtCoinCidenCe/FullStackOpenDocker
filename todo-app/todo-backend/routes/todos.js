const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let todos = parseInt(await getAsync("added_todos"));
  await setAsync("added_todos", todos + 1);
  res.send(todo);
});

/* statistics showing how many todos */
router.get('/statistics', async (_, res) => {
  const todos =  parseInt(await getAsync("added_todos"));
  res.send({ added_todos: todos });
});

const singleRouter = express.Router({mergeParams: true});

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const target = await Todo.findById(req.params.id);
  res.json(target);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body;
  const newOb = { text: body.text, done: body.done };
  const returnedTODO = await Todo.findByIdAndUpdate(req.params.id, newOb, { new: true });
  res.json(returnedTODO);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
