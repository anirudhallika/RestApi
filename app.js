const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/APIDb",{ useUnifiedTopology: true,useNewUrlParser: true });
const articleSchema = new mongoose.Schema(
  {
    name:{type:String},
    content:{type:String}
  }
);
const article = mongoose.model("article",articleSchema);
// app.listen(3000,function(req,res){
//   console.log("server started on port 3000");
// })
app.listen(3000,(req,res)=>{
  console.log("server started on port 3000");
}
)
// app.get("/articles",function(req,res){
//   article.find({},function(err,result){
//     if(err)
//     {
//       res.send(err);
//     }
//     else
//     {
//       res.send(result);
//     }
//   });
// });
// app.post("/articles",function(req,res){
//   const name = req.body.name;
//   const content = req.body.content;
//   console.log(req.body.name);
//   console.log(req.body.content);
//   article.insertMany([{name:name,content:content}],function(err,doc)
// {
//   if (err){
//     res.send(err);
//   }
//   else{
//     res.send("successfully logged record");
//   }
// })
// });
// app.delete("/articles",function(req,res){
//   article.deleteMany({},function(err,doc){
//     if(err)
//     {
//       res.send(err);
//     }
//     else
//     {
//       res.send("delete all documents");
//     }
//   });
// });
app.route("/articles")
.get(function(req,res){
  article.find({},function(err,result){
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(result);
    }
  });
})
.post((req,res)=>{
  const name = req.body.name;
  const content = req.body.content;
  console.log(req.body.name);
  console.log(req.body.content);
  article.insertMany([{name:name,content:content}],function(err,doc)
{
  if (err){
    res.send(err);
  }
  else{
    res.send("successfully logged record");
  }
})
})
.delete(function(req,res){
  article.deleteMany({},function(err,doc){
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send("delete all documents");
    }
  })
});



app.route("/articles/:dynamicPath")
.get((req,res)=>{
  const path = req.params.dynamicPath;
  console.log(path);
  article.find({name:path},function(err,docs){
    if(docs.length>0)
    {
      console.log(docs);
          res.send(docs);
    }
    else
    {
      res.send("article not found");
    }
  })
})
.put((req,res)=>{
  article.updateOne({name:req.params.dynamicPath},{name:req.body.name,content:req.body.content},{overwrite:true},function(err){
    if(!err)
    {
      res.send("Article is updated");
    }
    else
    {
      res.send(err);
    }
  })
})
.patch(function(req,res){
  article.updateOne({name:req.params.dynamicPath},{$set:{content:req.body.content}},function(err,doc){
    if(!err)
    {
      res.send("successfully updated");
    }
    else
    {
      res.send(err);
    }
  })
})
.delete((req,res)=>{
  article.deleteOne({name:req.params.dynamicPath},function(err){
    if(!err)
    {
      res.send("article deleted successfully");
    }
    else
    {
      res.send(err);
    }
  })
});
