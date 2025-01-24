const API_KEY = "6790a1c7581747effe5315e9";
var db = new restdb(API_KEY, {});

new db.listings.find({}, {}, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(res);
});
