const express = require('express');
const router = express.Router();
const request = require('request-promise');
const url = require('url');

/* get user feed */
let getDataFeed = (req, parseDataUri, callbackData) => {
  let options = {
    method: 'GET',
    uri: `https://graph.facebook.com/${req.user.id}/feed`,
    qs: {
        fields: parseDataUri.pageFieldSet,
        access_token: req.user.accessToken,
        limit: parseDataUri.limit
    }
  };
  if(parseDataUri.step == 'prev'){
    options.qs.since = parseDataUri.since;
    options.qs.__previous = parseDataUri.__previous;
    options.qs.__paging_token = parseDataUri.__paging_token;
  }else if(parseDataUri.step == 'next'){
    options.qs.until = parseDataUri.until;
    options.qs.__paging_token = parseDataUri.__paging_token;
  }
  request(options).then(fbRes => {
      const parsedRes = JSON.parse(fbRes);
      callbackData(parsedRes);
  }).catch( errno => {
      callbackData(errno);
  });
}

const pageFieldSet = 'created_time,message,link,description,name,picture';
const limit = 10;
let parseDataUri = {pageFieldSet:pageFieldSet,limit:limit};
/* GET index */
router.get('/', function(req, res, next) {
  if(req.user){
    const use_data_feed = getDataFeed(req,parseDataUri, (feedBack)=>{
      if(typeof feedBack.data !== 'undefined'){
        let parserUrlPrev = typeof feedBack.paging.previous !== 'undefined' ? url.parse(feedBack.paging.previous, true).query : [];
        let parserUrlNext = typeof feedBack.paging.next !== 'undefined' ? url.parse(feedBack.paging.next, true).query : [];
        res.render('index', { userFeeds: feedBack.data , itemPerPage: parseDataUri.limit, urlPrev: parserUrlPrev , urlNext : parserUrlNext});  
      }else{
        res.render('index', { userFeeds: feedBack , itemPerPage: parseDataUri.limit, urlPrev: [] , urlNext : []});  
      }
    });  
  }else{
    res.redirect('/login');
  }
});

router.get('/page', function(req, res, next) {
  if(req.user){
    parseDataUri.limit = req.query.item && !isNaN(parseInt(req.query.item)) ? req.query.item:10;
    if(req.query.prev && (req.query.prev == 'true')){
      parseDataUri.since = req.query.since;
      parseDataUri.__previous = req.query.__previous;
      parseDataUri.__paging_token = req.query.__paging_token;
      parseDataUri.step = 'prev';    
    }else if(req.query.next && (req.query.next == 'true')){
      parseDataUri.until = req.query.until;
      parseDataUri.__paging_token = req.query.__paging_token;
      parseDataUri.step = 'next';
    }
    const use_data_feed = getDataFeed(req,parseDataUri, (feedBack)=>{
      if(typeof feedBack.data !== 'undefined'){
        let parserUrlPrev = typeof feedBack.paging.previous !== 'undefined' ? url.parse(feedBack.paging.previous, true).query : [];
        let parserUrlNext = typeof feedBack.paging.next !== 'undefined' ? url.parse(feedBack.paging.next, true).query : [];
        res.render('index', { userFeeds: feedBack.data , itemPerPage: parseDataUri.limit, urlPrev: parserUrlPrev , urlNext : parserUrlNext});  
      }else{
        res.render('index', { userFeeds: feedBack , itemPerPage: parseDataUri.limit, urlPrev: [] , urlNext : []});  
      }
    });  
  }else{
    res.redirect('/login');
  }
});
module.exports = router;
