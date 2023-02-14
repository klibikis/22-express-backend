import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
// import multer from "multer";
// import { writeFileSync, readdirSync } from "fs";
// import { uuid } from "uuidv4";
import { db } from "./db";

const app = express();

app.use(express.json());
app.use(bodyparser.json());
app.use(cors({ origin: "*" }));


app.listen(3006, () => {
    console.log("Application started on port 3006!");
});


app.get("/", (req: Request, res: Response) => {
    res.send("Application works!");
});

app.get("/restaurants", (req: Request, res: Response) => {
    db.query("SELECT * FROM restaurants", function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get("/restaurants/:id", (req: Request, res: Response) => {
  const id = req.params.id
  db.query("SELECT * FROM restaurants WHERE id = ?;", id, function (err, data) {
      if (err) throw err;
      res.send(data[0]);
  });
});

app.get("/comments/postId=:id", (req: Request, res: Response) => {
  const id = req.params.id
  db.query("SELECT * FROM comments WHERE postId = ?;", id, (err, data) => {
      if (err) throw err;
      res.send(data);
  });
});

app.post("/restaurants", (req: Request, res: Response) => {
  const values = [
    req.body.name,
    req.body.description,
    req.body.foodStars,
    req.body.serviceStars,
    req.body.valueStars,
    req.body.atmosphereStars,
    req.body.image,
    req.body.location
  ];
  db.query("INSERT INTO restaurants(name, description, foodStars, serviceStars, valueStars, atmosphereStars, image, location) VALUES (?);", [values], (err, data) => {
    if (err) throw err;
      res.send(data);
    });
});

app.post("/comments", (req: Request, res: Response) => {
  const values = [
    req.body.postId,
    req.body.comment
  ];
db.query("INSERT INTO comments(postId, comment) VALUES (?);", [values], (err, data) => {
  if (err) throw err;
    res.send(data);
  });
});

app.delete("/comments/:id", (req: Request, res: Response) => {
  const id = req.params.id
  db.query("DELETE FROM comments WHERE id = ?;", id, (err, data) => {
    if (err) throw err;
      res.send(data);
  });
});

app.patch("/restaurants/:id", (req: Request, res: Response) => {
  const values = [
    req.body.name,
    req.body.description,
    req.body.foodStars,
    req.body.serviceStars,
    req.body.valueStars,
    req.body.atmosphereStars,
    req.body.image,
    req.body.location
  ];
  const id = req.params.id
  db.query("UPDATE restaurants SET `name`=?, `description`=?, `foodStars`=?, `serviceStars`=?, `valueStars`=?, `atmosphereStars`=?, `image`=?, `location`=? WHERE id = ?;", [...values, id], (err, data) => {
    if (err) throw err;
      res.send(data);
  });
});
