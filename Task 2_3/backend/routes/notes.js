const mysql = require("mysql2");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { body, validationResult } = require("express-validator");

// creating connection pool ==================================================>
const pool = mysql.createPool({
  connectionLimit: process.env.CONNECTION_LIMIT || 10, // Adjust as needed
  host: process.env.HOST,
  port: process.env.PORT || 3306,
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "",
  // database: process.env.DATABASE,
});

//functions to check the database and tables=======================================>
const preConnect = async () => {
  await createDB();

  console.log("created database / database exists");
  await selectDB();

  console.log("selected canvas database");

  await createTable();

  console.log("created canvasTable");
};

const createDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`,
      (createErr, results) => {
        if (createErr) {
          console.error("Error creating database:", createErr);
          reject(createErr);
          return;
        }
        resolve(results);
      }
    );
  });
};
const selectDB = () => {
  return new Promise((resolve, reject) => {
    pool.query(`USE ${process.env.DATABASE}`, (error, results) => {
      if (error) {
        console.error("Error sekecting database:", error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};
const createTable = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS canvasTable (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      tags VARCHAR(100)
    );`,
      (error, results) => {
        if (error) {
          console.error("Error creating database:", error);
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
};

// checking and creating database and tables

preConnect();
// functions for CRUD operations ======================================================>
const insertData = (title, description, tag) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO canvasTable (title, description, tags) VALUES (?, ?, ?)",
      [title, description, tag],
      (error, results, fields) => {
        if (error) {
          reject(error);
          return -1;
        }

        resolve(results.insertId); // Resolve with the inserted data
        return results.insertId;
      }
    );
  });
};
const updateData = (id, title, description, tag) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE canvasTable SET title=?, description=?, tags=? WHERE id=?`,
      [title, description, tag, id],
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results); // Resolve with the updated data
      }
    );
  });
};
const deleteData = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from canvasTable WHERE id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        } else {
          pool.query(
            `delete from canvasTable WHERE id=?`,
            [id],
            (error, results, fields) => {
              if (error) {
                reject(error);
                return;
              }

              resolve(results); // Resolve with the updated data
            }
          );
        }
      }
    );
  });
};

const getData = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM canvasTable", (error, results, fields) => {
      if (error) {
        console.error("Error fetching data:", error);
        reject(error);
        return;
      }

      resolve(results); // Resolve with the fetched data
    });
  });
};

// All Routes=========================================================================>

//ROUTE to fetch all existing notes
router.get("/fetchallnotes", async (req, res) => {
  try {
    const notes = await getData();
    res.json(notes);
  } catch (error) {
    //catch
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//ROUTE: to add new note
router.post(
  "/addnew",

  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Enter a Valid Description").isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
      }

      const note = await insertData(title, description, tag);

      return res.json({ note });
    } catch (error) {
      //catch
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//ROUTE: to update exisiting note
router.put("/updatenote/:id", async (req, res) => {
  const { title, description, tag } = req.body;
  const { id } = req.params;
  try {
    let r = await updateData(id, title, description, tag);

    return res.json({ note: "updated" });
  } catch (error) {
    return req.status(404).send("Not Found");
  }
});

//ROUTE: to delete exisiting note
router.delete("/deletenote/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let r = await deleteData(id);
    //     let note= await Notes.findById(req.params.id);
    // if(!note)
    // return  req.status(404).send("Not Found");

    // note =await Notes.findByIdAndDelete(req.params.id)
    return res.json({ note: 1 });
  } catch (error) {
    //catch
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

module.exports = router;
