const express=require("express");
const app=express();
const https=require("https");
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    // res.send("<h1>Today's Temp =</h1>"+dat);
});
app.post("/",(req,res)=>{
    // res.send("<h1>"+req.body+"</h1>");
    const city=req.body.cityName;
    const unit="metric";
    const apiKey="181d063c363b069c59c9fc688ac44995";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
    https.get(url,(response)=>{
        console.log("Server statuc code = "+response.statusCode);
        response.on("data",(data)=>{
            data = JSON.parse(data) // Converting hexa decimal into json object
            const temp=data.main.temp;
            const desc=data.weather[0].description;
            const icon=data.weather[0].icon;
            const iconLink="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(icon);
            res.write("<p>The Weather is Currently "+desc+"</p>");
            res.write("<h2>Temperature of "+city+" is "+temp+" degrees Celcius</h2>");
            res.write("<img src="+iconLink+">");
            res.send();
        });
    });
});

app.listen(8080,()=>{
    console.log("Server Started at 8080 Port");
});