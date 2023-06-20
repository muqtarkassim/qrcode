const express=require ("express");
const https=require("https");
const bodyparser=require("body-parser")
const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req,res){

const city=req.body.cityname;
const apikey="b21ed4bef4c21a535f49a1e5470e9b13";
const unit="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit;
https.get(url,function(response){
    response.on("data",function(data){
       const weatherData= JSON.parse(data);
       const temp=weatherData.main.temp;
       const icon=weatherData.weather[0].icon;
    imageurl="https://openweathermap.org/img/wn/" +icon+"@2x.png";
    res.write("<h1>the temperature today is"  +temp + "</h1>");
    res.write("<img src="+imageurl+">")
     res.send();
    })
})
})

app.listen(3000,function(){
    console.log("listenning")
})

