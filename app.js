// הגדרת משתנה שיש לו יכולות מיוחדות של האקספרס
const express = require('express');
// יודע לקחת נתיב ולעשות עליו מניפולציות
const path = require('path');
// הגדרת משתנה שיש לו יכולת להפעיל שרת
const http = require('http');
// גורם לכך שתהיה גישה מכל דומיין לצד שרת
const cors = require('cors');
// חיבור למונגו על ידי מונגואוס
require('./db/connectMongo');
// חיבור קובץ הראוט
const { routesInit } = require('./routes/config_route')
// הגדרת משתנה שיש לו את היכולת של אקספרס כולל האזנה לראוט
const app = express();

//// the app.use need to be before app.get!!
// הגדרת פירסור מידע כג'ייסון
app.use(express.json());

// נגדיר את תיקיית הפאבליק כתיקייה סטטית שניתן לשים בה קבצים נגישים לצד לקוח
app.use(express.static(path.join(__dirname, 'public')));

// גורם לכך שתהיה גישה מכל דומיין לצד שרת
app.use(cors())

// // הגדרת ראוט של העמוד בית ומה יקרה
// // req -> מה שנקבל בדרך כלל מהצד לקוח או הדפדפן בראוט
// // res -> מה השרת מגיב לצד לקוח, במקרה שלנו - דפדפן
// app.get('/', (req, res) => {
//     // אומר לו להחזיר מידע בפורמט ג'ייסון לצד לקוח
//     res.json({ start: 'Hello world' });
// });

routesInit(app);

// מייצרים שרת שמשתמש במשפנה אפ שיש לו את כל היכולות המיוחדות של אקפרס
const server = http.createServer(app);

// הגדרת הפורט
let port = process.env.PORT || '3000';
// מאזינים לשרת בפורט שהגדרנו
server.listen(port);