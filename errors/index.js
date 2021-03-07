 
exports.customErr = (err, req, res, next) => {
  console.log(err)
  res.status(err.status || 404).send(err.error);
};