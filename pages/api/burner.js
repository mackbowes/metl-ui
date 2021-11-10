export default function handler(req, res) {
  let request = {
    METHOD: "post",

    body: { name: req.name, address: req.address },
  };

  fetch("https://api.metl", request);
  res.status(200).json({ name: "John Doe" });
}
