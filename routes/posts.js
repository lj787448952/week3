var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');
/* GET home page. */
// router.get('/posts', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', PostsControllers.getPosts);

router.post('/', PostsControllers.createdPost);

router.delete('/', PostsControllers.deleteAllPost);

router.delete('/:id', PostsControllers.deleteOnePost);

router.patch('/:id', PostsControllers.updateOnePost);

module.exports = router;
