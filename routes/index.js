exports.index = function(req, res){

  res.render('index', { title: 'Express' });
};

exports.log = function(req, res){
  res.render('log', { title: 'Zttz' });
};
