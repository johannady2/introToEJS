
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const checkDay = (req, res, next) =>
{
    let data = new Date();
    let todaysDay = data.getDay();
    // let todaysDay = 6;//Saturday
     // let todaysDay = 1;//Monday
    console.log(`today's date is: ${data}`);
    console.log(`Today is: ${todaysDay}`);
    
    
    if (todaysDay === 0 || todaysDay === 6)
    {
        console.log("It's the weekend!");
        req.IsTodayAWeekend = true;
    }
    else
    {
        console.log("It's a weekday!");
        req.IsTodayAWeekend = false;
    }

    
    next();
}


app.use(express.urlencoded({ extended: true }));//body-parser is now part of express
//app.use(bodyParser.urlencoded({ extended: true }));//extended: true allows for rich objects and arrays to be encoded into the URL-encoded format, which can be useful for complex data structures.
app.use(bodyParser.json());

app.use(checkDay);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



app.get("/", (req, res) => {

    let todaysMessage = "It's a weekday! Let's work!"
        if(req.IsTodayAWeekend === true)
        {
            todaysMessage = "It's the weekend! Let's exercise!"
        }

        res.render("index.ejs",
            {
                publicTodaysMessage: todaysMessage,

            }
        );
   
});
