var express = require('express');
require('./db')
var emp  = require('./model/employee');

//initiallisation of express
var app = express();
var port = 3999;
//midflewere ana api
app.use(express.json())
//to add data to db 
app.post('/',(req,res)=>{
    try {
         emp(req.body).save()
        res.send("data aded")
    } catch (error) {
        res.send(error)
    }
})
app.get('/',async(req,res)=>{
    try{
        var data=await emp.find();
        res.send(data)
    }
    catch (error) {
        res.send(error)
    }
})
app.delete('/:Id',async(req,res)=>{
    //term : uses for variabele values
    //if we put async then we should give await "it is a pair' manditory
    //get is used to get the details by searching the id
    //post is used to push or insert the data by giving details and data
try{
    console.log(req.params.Id);
    await emp.findByIdAndDelete(req.params.Id);
      res.send("data deleted")   
}
catch (error) {
        res.send(error)
    
}})

//port assigning



//to update
//put is used to update the datas we can give the data to  postman and give id to which is to be edited and select put option then it will display as edited then to get for checking weather it is edited or not
app.put('/:Id',async(req,res)=>{
    try {
        await emp.findByIdAndUpdate(req.params.Id,req.body);
        res.send("edited")
    } catch (error) {
        res.send(error)
        
    }
})
//to get a single document
app.get('/:id',async(req,res)=>{
    try{
        var data = await emp.findById(req.params.id);
        res.send(data)

    }catch (error) {
        res.send(error)
        
    }})
app.listen(port,()=>{
    console.log(`server is up and running in ${port}`)
})