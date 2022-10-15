import app from "./app";
import AppDataSource from "./data-source";

(async () => {

    await AppDataSource.initialize()
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    const port = 3000
    
    app.listen(port, () => {
        console.log(`Servidor executando ${port}` )
    })    
})()