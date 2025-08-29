const express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser");
const controller = require("./controller");

const cloudinary = require("cloudinary").v2;


cloudinary.config({
    secure:true,
});

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const passport = require('passport');
require('./passport')(passport);
const app = express();
const cors = require('cors');
const { isErrored } = require('supertest/lib/test');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(passport.initialize());
app.use(cors())




app.post("/signup",controller.signup)


app.post('/login', async (req, res) => {

     const { email, password } = req.body;
     const user = await prisma.user.findUnique({
     where : {
        email
     }
     })
    

     if (!user) return res.status(401).json({ error: 'The email you’ve entered is incorrect' });

     const match = await bcrypt.compare(password, user.password);

     if (!match) return res.status(401).json({ error: 'The password you’ve entered is incorrect' });

     const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {

     expiresIn: '1h'
 });
  res.json({ token , id : user.id});
});


app.get("/users/:id/friends",controller.friends)

app.put("/users/:id/friend",controller.friend_add)


app.get("/users/:id",controller.user)


app.get("/users/:id/requests_sent",controller.requests_sent)

app.get("/users/:id/requests_received",controller.requests_received)


app.delete("/requests/:id",controller.request_delete)

app.put("/request",controller.request_add)


app.get("/users",controller.users)




app.get("/users/:id/posts",controller.posts)



app.get("/posts/:id/comments",controller.comments)


app.put("/users/:id/cover",upload.single("cover"),async (req, res) => {
  try {
    const {id} = req.params
    // Get file buffer
    const fileBuffer = req.file.buffer.toString("base64");
    const dataUri = "data:" + req.file.mimetype + ";base64," + fileBuffer;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "react_uploads", // optional folder in Cloudinary
    });

    const user = await prisma.user.update({
        where : {
            id : parseInt(id,10)
        },
        data : {
            cover : result.secure_url
        }
    })

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.put("/users/:id/image",upload.single("image"),async (req, res) => {
  try {
    const {id} = req.params
    // Get file buffer
    const fileBuffer = req.file.buffer.toString("base64");
    const dataUri = "data:" + req.file.mimetype + ";base64," + fileBuffer;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "react_uploads", // optional folder in Cloudinary
    });

    const user = await prisma.user.update({
        where : {
            id : parseInt(id,10)
        },
        data : {
            icon : result.secure_url
        }
    })

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});


app.put("/posts/:id/comment",controller.comment_add)

app.put("/users/:id/post",controller.post_add)


app.put("/posts/:id/like",controller.post_like)


app.get("/",passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.send("hi")
})

app.listen("3000",()=>{
    console.log(". . .")
})