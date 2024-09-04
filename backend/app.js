const express =require('express')
const app = express();
const port =3000;

// Body parser, reading data from body into req.body
app.use(express.json());

// Middleware demon
// app.use((req,res,next)=>{
//     console.log("")
// })
// app.use((req,res,next)=>{
//     req.requestTime =new Date().toISOString()
//     next();
// })

// //Demon
// app.post('/api/v1/users',(req,res)=>{
//     console.log(req.body)
//     res.send('Done')
// })
// app.get('/api/v1/users/:id/:x/:y?',(req,res)=>{
//     console.log(req.params);
//     res.status(200).json(
//         {
//             status:'success'
//         }
//     )
// })
app.listen(port,()=>{
    console.log(`App running on port ${port}...`)
});