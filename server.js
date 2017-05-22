//depends
const express=require(`express`),
      S3=require(`./server/S3ctrl`),
      keys=require(`./server/keys`),
      cors=require(`cors`),
      bodyParser=require(`body-parser`),
      massive=require(`massive`)

//app
const app=module.exports=express()
app.listen(keys.port,()=> console.log(`party on ${keys.port}`))
app.use(express.static(`./public`))
app.use(`/node_modules`, express.static(`./node_modules`))
app.use(bodyParser.json({limit: `50mb`}))
app.use(bodyParser.urlencoded({limit: `50mb`, extended: true}))
  //db
const db=massive.connectSync({
  connectionString: `postgres://${keys.db.user}:${keys.db.pass}@${keys.db.endpoint}:${keys.db.port}/${keys.db.db}`
})
app.set(`db`,db)

//endpoints
app.post(`/api/upload`,(req,res)=>{
  let single=req.body
  let principles=Object.keys(single).filter((x)=>{
    return (x===true||x===false)
  })
  console.log(principles)
  console.log(single)
  S3.sendPics(single.before, (data, err)=>{
    if (err) {console.log(err);}
    single.before=data.Location;
    S3.sendPics(single.after, (data, err)=>{
      if(err){console.log(err)}
      single.after=data.Location;
      db.cases.insert({name: single.key, diagnosis: single.diagnosis, before: single.before, after: single.after, patient: single.patient, doctor: single.doctor, specialty: single.specialty},(err,data)=>{
        console.log(data, `31`)
        db.run(`select * from principles;`,(err,p)=>{
          p.forEach((x)=>{
            console.log(x)
            db.status.insert({caseid: data.id, pid: x.id, status: single[x.name]},(data,err)=>{
              if(err){console.log(err)}
            });
          })
        })
        res.send(`ok!`)
      })
    })
  })
});

app.delete(`/api/delete`,(req,res)=>{
  let id=req.query.id
  db.run(`delete from status s using cases c where s.caseid=c.id and c.id=$1;`,[id],(err1, data)=>{
    if (err1) {res.send(err1)}
    db.run(`delete from cases where id=$1`,[id],(err2,data)=>{
      if(err2) {res.send(err2)}
      res.send(`ok!`)
    })
  });
});

app.get(`/api/cases`,(req,res)=>{
  db.run(`SELECT cases.id AS casesId, cases.name as title, diagnosis, patient, doctor, specialty, before, after FROM cases;`,(err, data)=>{
    let response=[]
    if(err){console.log(err)}
    data.forEach((x)=>{
      let single={
        id: x.casesid, title: x.title, diagnosis: x.diagnosis, patient: x.patient, doctor: x.doctor, specialty: x.specialty, before: x.before, after: x.after
      };
      db.run(`SELECT s.status, p.name FROM status s JOIN principles p ON s.pid = p.id WHERE s.caseid = ${single.id};`, (err,data2)=>{
        if(err){console.log(err)}
        single.principles=data2[0]
      })
      response.push(single)
    })
    res.json(response)
  })
});

app.get(`/api/single`, (req,res)=>{
  let id=req.query.id
  console.log(id);
  db.run(`SELECT cases.id, cases.name as title, diagnosis, patient, doctor, specialty, before, after, status.status, principles.name as principle FROM cases JOIN status ON cases.id=status.caseid JOIN principles ON principles.id=status.pid WHERE cases.id = $1;`,[id], (err, data)=>{
    console.log(data);
    console.log(err);
    let single={
      id: data[0].id, title: data[0].title, diagnosis: data[0].diagnosis, patient: data[0].patient, doctor:data[0].doctor, specialty: data[0].specialty, before: data[0].before, after: data[0].after, principles: []
    }
    data.forEach((x)=>{
      single.principles.push({principle: x.principle, status: x.status})
    })
    if (err) res.send(err)
    else res.send(single)
  })
})

app.get(`/api/principles`,(req,res)=>{
  db.run(`select name from principles`,(err,data)=>{
    if (err) {res.send(err)}
    res.send(data)
  })
})
