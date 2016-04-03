var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
  var promoRouter = express.Router();
  
  promoRouter.use(bodyParser.json());
  
  promoRouter.route('/')
  .all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
  })

  .get(function(req,res,next){
          res.end('Will send all the promos to you!');
  })

  .post(function(req, res, next){
      res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);    
  })

  .delete(function(req, res, next){
          res.end('Deleting all promos');
  });

  promoRouter.route('/:Id')
  .all(function(req,res,next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
  })

  .get(function(req,res,next){
          res.end('Will send details of the promo: ' + req.params.Id +' to you!');
  })

  .put(function(req, res, next){
          res.write('Updating the promo: ' + req.params.Id + '\n');
      res.end('Will update the promo: ' + req.body.name + 
              ' with details: ' + req.body.description);
  })

  .delete(function(req, res, next){
          res.end('Deleting promo: ' + req.params.Id);
  });
  
  return promoRouter;
};
