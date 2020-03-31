const handleSignIn = (req, res, db, bcrypt) => {
  const { password, email } = req.body;

  if (!(email && password)) {
    return res.status(400).json("enter a valid info");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("email and password incorrect");
      }
    })
    .catch(err => res.status(400).json("email and password incorrect"));
  // bcrypt.compare(
  //   "orange",
  //   "$2a$10$Hzx/kbzx6zVdw.SLcGp0ausK2LSkTdC/UNkbyNzOr1nQgDhDJsUFa",
  //   function(err, res) {
  //     console.log("first response", res);
  //   }
  // );

  // bcrypt.compare(
  //   "veggies",
  //   "$2a$10$Hzx/kbzx6zVdw.SLcGp0ausK2LSkTdC/UNkbyNzOr1nQgDhDJsUFa",
  //   function(err, res) {
  //     // res = false
  //     console.log("second response", res);
  //   }
  // );
};

module.exports = {
  handleSignIn: handleSignIn
};
