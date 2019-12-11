module.exports = function Headers(req,res,next){
    res.set('X-Content-Type-Options','nosniff');
    res.set('X-DNS-Prefetch-Control','off');
    res.set('X-Frame-Options','SAMEORIGIN');
    res.set('X-Download-Options','noopen');
    res.set('X-XSS-Protection',1);
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Headers',['Origin', 'X-Requested-With', 'Content-Type', 'Accept']);
    next();
  }