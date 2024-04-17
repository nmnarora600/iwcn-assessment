
const express = require("express");
const router = express.Router();



// function to send api request ===============================>
async function sendRequest(phone){
    const res= await fetch('https://chimpu.xyz/api/post.php',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
         
        },
        body: JSON.stringify({ phonenumber:phone }),
      });
      const headers = {};
      res.headers.forEach((value, key) => {
          headers[key] = value;
      });
      return headers;
}



// All Routes=========================================================================>


router.post("/", async (req, res) => {
  try {
    const head= await sendRequest(req.body.phonenumber);
   
   

    return res.status(200).json(head)
  } catch (error) {
    //catch
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});







module.exports = router;
