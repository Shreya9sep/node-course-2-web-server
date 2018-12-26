// this is where we have routes  

const express= require('express');
const hbs= require('hbs');
const fs=require('fs');
var app= express();
hbs.registerPartials(__dirname +'/views/partials')
app.set('view engine','hbs')
//app.use(express.static(__dirname+'/public1'))
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})
/*app.use((req,res,next)=>{
    res.render('maintainence.hbs');
});*/
app.use(express.static(__dirname+'/public1'))
app.use((req,res,next)=>{
    var now= new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log)
    fs.appendFile('server.log',log +'\n', (err)=>{
        if(err){
            console.log('error is there');
        }
    })
    next();
});

app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express</h1>')
    /*res.send({
        name:'Shreya',
        likes:[
            'reading',
            'writing'
        ] 
    })*/
    res.render('welcome.hbs',{
        pageTitle:'Welcome Page',
        currentYear: new Date().getFullYear(),
        message:"welcome to my first page"
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs', {
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle'

    });
});
app.listen(3000,()=>{
    console.log('server is running on port 3000')
});
