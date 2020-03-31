const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "e2fc2e7f35014e00b280102081098c4d"
});

const handleAPIClarifai = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Api not responding"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment({
      entries: 1
    })
    .returning("entries")
    .then(entry => {
      entry.length
        ? res.json(entry[0])
        : res.status(400).json("no entry found");
    })
    .catch(err => res.status(400).json("id does not match"));
};

module.exports = {
  handleImage: handleImage,
  handleAPIClarifai: handleAPIClarifai
};
