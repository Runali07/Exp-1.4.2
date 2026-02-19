const express = require("express");
const app =express();
app.use(express.json());
let cards=[];
let idCounter=1;
app.post("/cards",(req,res)=>{
 const card={
  id:idCounter++,
  suit:req.body.suit,
  rank:req.body.rank
 };
 cards.push(card);
 res.status(201).json(card);
  });
  app.get("/cards",(req,res)=>{
   res.json(cards);
  });
  app.get("/cards/:id",(req,res)=>{
    const card=cards.find(c=>c.id==req.params.id);
    if(!card)
      return res.status(404).json({message:"Card not found"});
    res.json(card);
  });
  app.put("/cards/:id", (req, res) => {
    const card = cards.find(c => c.id == req.params.id);
    if (!card)
        return res.status(404).json({ message: "Card not found" });
    card.suit = req.body.suit;
    card.rank = req.body.rank;
    res.json(card);
});
app.delete("/cards/:id", (req, res) => {
    const index = cards.findIndex(c => c.id == req.params.id);
    if (index === -1)
        return res.status(404).json({ message: "Card not found" });
    cards.splice(index, 1);
    res.json({ message: "Card deleted" });
});

app.listen(3000,()=>{
 console.log("Serving running on port 3000");
});