function fetchCounter() {
  let count = 0;

  function increment(req, res, next) {
    count++;
    if (count > 5) {
      setTimeout(() => {
        count = 0;
      }, 10000);
      res.send({
        code: 400,
        count,
        message: "count is more than 5",
      });
    } else {
      next();
    }
  }

  function getCount() {
    return count;
  }
  return {
    increment,
    getCount,
  };
}

export default fetchCounter;
