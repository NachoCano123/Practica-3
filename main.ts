import express,{Request, Response} from "npm:express@4.18.2"
import { personajes, localizaciones, getcharacterpagina, getcharacterID, getlocalizacionpagina, getlocalizacionID } from "./Ejercicio.ts"

export let cachepersonajes: personajes[] = []
export let cachelocalizaciones: localizaciones[] = []

const miapp = express()

//Para mostrar el resultado haces deno run y pones en el buscador de google http://localhost:3000/personajes/(numero de la pagina sin los :)

//Listar todos los caracteres de forma paginada
miapp.get("/personajes/:pagina",async (req:Request, res:Response) =>
{
    try{
        const pagina = req.params.pagina
        const caracter = await getcharacterpagina(pagina)
        res.status(200).send(caracter) //Por el puerto 200 manda la variable que contiene los caracteres de la pagina
        }
        catch(e)
        {
          res.status(400).send("numero de pagina incorrecto")
        }
})

//Obtener un caracter especifico
miapp.get("/personajesid/:ID",async (req:Request, res:Response) =>
{
  try{
    const ID = req.params.ID
    const caracterid = await getcharacterID(ID)

    cachepersonajes.push(caracterid)
    
    res.status(200).send(caracterid) 
    }
    catch(e)
    {
      res.status(400).send("ID incorrecto")
    }
})

//Listar todas las localizaciones de forma paginada
miapp.get("/personajeslocalizacion/:pagina",async (req:Request, res:Response) =>
{
  try{
    const pagina = req.params.pagina
    const localizacion = await getlocalizacionpagina(pagina)
    res.status(200).send(localizacion) 
  }catch(e)
  {
    res.status(400).send("numero de pagina incorrecto")
  }
})

//Obtener una localizacion en especifico
miapp.get("/localizacionid/:ID",async (req:Request, res:Response) => 
{
  try{
    const ID = req.params.ID
    const localizacionid = await getlocalizacionID(ID)

    cachelocalizaciones.push(localizacionid)

    res.status(200).send(localizacionid) 
  }
  catch(e)
  {
    res.status(400).send("id incorrecto")
  }
})

//Filtrar un personaje segun su estatus
miapp.get("/mostarpersonajeporstatus/:status", async (req:Request, res:Response) =>
{
  try {
    //Estados a elegir: 'Alive', 'Dead' o 'unknown'
    const estado = req.params.status
    const resultado = cachepersonajes.filter(elem => elem.status===estado)
    res.status(200).send(resultado) 
  }catch(e) 
  {
    res.status(400).send("estatus incorrecto")
  }
})

//Filtrar un personaje segun su genero
miapp.get("/mostarpersonajeporgenero/:gender", async (req:Request, res:Response) =>
{
  try {
    //Generos a elegir: 'Female', 'Male', 'Genderless' o 'unknown'
    const genero = req.params.gender
    const resultado = cachepersonajes.filter(elem => elem.gender===genero)
    res.status(200).send(resultado) 
  }catch(e) 
  {
    res.status(400).send("genero incorrecto")
  }
})

//Filtrar una localizacion segun su tipo
miapp.get("/mostrarlocalizacionesportipo/:type", async (req:Request, res:Response) =>
{
  try {
    //Los tipos de las localizaciones se escriben con la primera letra en mayuscula
    const tipo = req.params.type
    const resultado = cachelocalizaciones.filter(elem => elem.type===tipo)
    res.status(200).send(resultado) 
  }catch(e) 
  {
    res.status(400).send("tipo incorrecto")
  }
})

//Filtrar una localizacion segun su dimension
miapp.get("/mostrarlocalizacionespordimension/:dimension", async (req:Request, res:Response) =>
{
  try {
    //Los tipos de las localizaciones se escriben con la primera letra en mayuscula, excepto unknown
    const dimension = req.params.dimension
    const resultado = cachelocalizaciones.filter(elem => elem.dimension===dimension)
    res.status(200).send(resultado) 
  }catch(e) 
  {
    res.status(400).send("dimension incorrecta")
  }
})

//Borrar un personaje segun su id (Esta funcion debe de hacerse en postman)
miapp.delete("/borrarpersonajeporsuID/:ID", async (req: Request, res: Response) =>
{
  try {
    //Los tipos de las localizaciones se escriben con la primera letra en mayuscula, excepto unknown
    const ID = req.params.ID
    const resultado = cachepersonajes.filter(elem=>elem.id!==ID) //Mostramos todos los personajes que no tienen ese id
    cachepersonajes = resultado //Actualizamos la memoria interna
    res.status(200).send(resultado) 
  }catch(e) 
  {
    res.status(400).send("ID incorrecto")
  }
})

//Borrar una localizacion segun su id (Esta funcion debe de hacerse en postman)
miapp.delete("/borrarlocalizacionporsuID/:ID", async (req: Request, res: Response) =>
{
  try {
    //Los tipos de las localizaciones se escriben con la primera letra en mayuscula, excepto unknown
    const ID = req.params.id
    const resultado = cachelocalizaciones.filter(elem=>elem.id!==ID)
    cachelocalizaciones = resultado
    res.status(200).send(resultado) 
  }catch(e) 
  {
    res.status(400).send("ID incorrecto")
  }
})

miapp.listen(3000)