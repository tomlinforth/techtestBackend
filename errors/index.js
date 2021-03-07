 
exports.customErr = (err, req, res, next) => {
  console.log(err)
  res.status(err.code || 500).send({err});
};