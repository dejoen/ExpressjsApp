const express= require('express')
const app =express()
const session=require('express-session')

const { CyclicSessionStore } = require("@cyclic.sh/session-store");
const PORT =process.env.PORT || 8080
const dotevn=require('dotenv').config()
//ruyt
console.log(process.env.PORT)
console.log(process.env.CYCLIC_DB)
const options = {
  table: {
    name:process.env.CYCLIC_DB,
  }
};
app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: new CyclicSessionStore(options),
    
  })
);
/*app.get('/',(req,res)=>{
  res.send('hello word')
})*/
/*app.use((req,res,next)=>{
  console.log('Time Now:'+Date.now())
  //  res.sendStatus(Date.now())
  next()
},(req,res,next)=>{
  console.log('new time now'+Date.now())
  next()
})*/

app.get("/",(req,res)=>{
   let count =0
  req.session.view=count
   req.session.user='devjoe'
   console.log(count)
   res.send("happy now")
})
app.get("/user",(req,res)=>{
  res.send(req.session.user)
})
app.get('/user/:id',(req,res,next)=>{
  console.log(req.params.id)
  if(req.params.id==='0')
    next('route')
    else next()
},(req,res,next)=>{
  res.send('regular')
})
app.get('/user/:id',(req,res,next)=>{
  res.send('special'+req.session.user)
})

app.listen(PORT,()=>{
  console.log(`app running on ${PORT}`)
})
