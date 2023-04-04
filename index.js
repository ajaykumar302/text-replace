const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Responce} = require("./Schema")
const app = express();
app.use(bodyParser.json());

// DB config
const URL = 'mongodb+srv://kavaajaykumar143:IDeEDlxr85qPfLer@cluster0.wgm10kg.mongodb.net/text replace?retryWrites=true&w=majority';
mongoose.connect(URL, 
    {
     useNewUrlParser: true,
     useUnifiedTopology: true 
    })
  .then(() => console.log(`Connected to MongoDB database`))
  .catch((err) => console.error(err));

// Dynamic HTML string
const htmlString = `
  <h1>{{message}}</h1>
  <h2>{{name}}</h2>
  <p>{{company}}</p>
  <p>{{salary}}</p>
  <p>{{details}}</p>
`;

app.get('/',(req,res)=>{
    res.send(htmlString)
})

//  replace  text in HTML
app.post('/replace-text', async (req, res) => {
  const { message,name,company, salary,details } = req.body;
  const html = htmlString
  .replace(/{{message}}/g, message)
  .replace(/{{name}}/g, name)
  .replace(/{{company}}/g, company)
  .replace(/{{salary}}/g, salary)
  .replace(/{{details}}/g, details);
  try {
    const response = await Response.create({ html });
    console.log(`Inserted response with ID ${response._id}`);
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error storing response in database');
  }
});


// connected the server
const port = 7000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});