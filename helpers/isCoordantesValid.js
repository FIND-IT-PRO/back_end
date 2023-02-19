module.exports = function isCoordantesValid(val) {
  console.log(val); //check the range of the coordinates
  if (val.length != 2) {
    return false;
  }
  if (val[0] < -180 || val[0] > 180) {
    return false; //2pi (phi of the sphere)
  }
  if (val[1] < -90 || val[1] > 90) {
    return false; //pi (teta of the  sphere)
  }
  return true;
};
