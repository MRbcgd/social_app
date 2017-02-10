var express = require('express');
var router = express.Router();
var client=require('../db/mysql')

/* GET home page. */
router.get('/', function(req, res, next) {
  client.query('SELECT * FROM articles ORDER BY id DESC',function(error,results){
    if(error){
      return console.log(error)
    }

    res.render('index', { articles : results });
  })
});
router.get('/register_article', function(req, res, next) {
  res.render('register_article')
});
router.post('/register_article', function(req, res, next) {
  var body=req.body

  client.query('INSERT INTO articles(title,description) VALUES (?,?)',[
    body.title,body.description
  ],function(error){
    if(error){
      return console.log(error)
    }

    res.redirect('/');
  })
});
router.get('/read_article/:id', function(req, res, next) {
  var id=req.params.id
  //선택한 article
  client.query('SELECT * FROM articles WHERE id=?',[
    id
  ],function(error,article_result){
    if(error){
      return console.log(error)
    }
    //선택한 article의 comments
    client.query('SELECT id,username,description,deleted FROM comments WHERE articles_id=? AND comments_id IS NULL',[
      id
    ],function(error,comments_results){
          if(error){
            return console.log(error)
          }

          client.query('SELECT * FROM comments WHERE articles_id =? AND comments_id IS NOT NULL',[
            id
          ],function(error,child_comments_results){
            if(error){
              return console.log(error)
            }

            res.render('read_article',{
              article : article_result[0],
              comments : comments_results,
              child_comments : child_comments_results
            })
          })
        })
  })
});
router.get('/delete_article/:id',function(req, res, next){
  var id=req.params.id

  client.query('DELETE FROM articles WHERE id=?',[
    id
  ],function(error){
    if(error){
      return console.log(error)
    }

    res.redirect('/')
  })
})
router.post([
  '/register_comment/:article_id',
  '/register_comment/:article_id/:comment_id'
],function(req, res, next){
  
  var article_id=req.params.article_id//article id
  var comment_id=req.params.comment_id
  var body=req.body//username,comment description

  var query1='INSERT INTO comments (username,description,articles_id) VALUES (?,?,?)'
  var query2='INSERT INTO comments (username,description,articles_id,comments_id) VALUES (?,?,?,?)'

  if(!comment_id){//register comment
    client.query(query1,[
      body.username,body.description,article_id
    ],function(error){
      if(error){
        return console.log(error)
      }
    })
  }
  if(comment_id){//register child comment
    client.query(query2,[
      body.username,body.description,article_id,comment_id
    ],function(error){
      if(error){
        return console.log(error)
      }
    })
  }

  res.redirect('/read_article/'+article_id)
})
router.get('/delete_comment/:article_id/:id',function(req,res,next){
  var article_id=req.params.article_id
  var id=req.params.id//comment id

  client.query('UPDATE comments SET description="DELETED COMMENT", deleted=1 WHERE id=?',[
    id
  ],function(error,result){
    if(error){
      return console.log(error);
    }

    res.redirect('/read_article/'+article_id)
  })
})
router.all('*',function(req,res,next){
  res.redirect('/')
})
module.exports = router;
