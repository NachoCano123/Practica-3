export type personajes = {
    id: number
    name: string
    status: string
    species: string
    gender: string
    origin: object
    location: object
    created: string
}

export type localizaciones = 
{
  id: number
  name: string
  type: string
  dimension: string
  created: string
}

//Mapear es transformar un url en string
//const ID = prompt("Dime el id de tu personaje")

export const getcharacterpagina = async (pagina: string):Promise <personajes[]> =>
{
  const BASE_URL = "https://rickandmortyapi.com/api/character/?page=" + pagina
  const data = await fetch(BASE_URL) //Ponemos la ruta principal, y en los get le ponemos las extensiones para buscar lo que queramos en cada caso
  if(data.status !== 200) //Indica si la peticion ha sido bien respondida. Nuestro status es 200, por lo que si me debuelve algo distinto de 200
  {
      throw new Error("Eso no es valido") //Lanza un error
  }
  const json = await data.json()
  return json.results //Devuelve los datos de los personajes, ya que en la pagina de la api de rick y morty te pide poner results para mostrar los datos
}

export const getcharacterID = async (ID: number):Promise <personajes> =>
{
  const BASE_URL = "https://rickandmortyapi.com/api/character/" + ID
  const data = await fetch(BASE_URL) //Ponemos la ruta principal, y en los get le ponemos las extensiones para buscar lo que queramos en cada caso
  if(data.status !== 200) //Indica si la peticion ha sido bien respondida. Nuestro status es 200, por lo que si me devuelve algo distinto de 200
  {
      throw new Error("Eso no es valido") 
  }

  const json = await data.json()
  
  return { //Poner el corchete en la misma linea que el return
    id:json.id, //Se devuelven cada uno de los datos que nos piden en el ejercicio
    name:json.name,
    status:json.status,
    species:json.species,
    gender:json.gender,
    origin:json.origin,
    location:json.location,
    created:json.created
  }

}

export const getlocalizacionpagina = async (pagina: string):Promise <personajes[]> =>
{
  const BASE_URL = "https://rickandmortyapi.com/api/location/?page=" + pagina
  const data = await fetch(BASE_URL) //Ponemos la ruta principal, y en los get le ponemos las extensiones para buscar lo que queramos en cada caso
  if(data.status !== 200) //Indica si la peticion ha sido bien respondida. Nuestro status es 200, por lo que si me debuelve algo distinto de 200
  {
      throw new Error("Eso no es valido")
  }
  const json = await data.json()
  return json.results //Devuelve los datos de los personajes, ya que en la pagina de la api de rick y morty te pide poner results para mostrar los datos
}

export const getlocalizacionID = async (ID: number):Promise <localizaciones> =>
{
  const BASE_URL = "https://rickandmortyapi.com/api/location/" + ID
  const data = await fetch(BASE_URL)
  if(data.status !== 200)
  {
    throw new Error("Eso no es valido") 
  }
  const json = await data.json()
  
  return {
    id: json.id,
    name: json.name,
    type: json.type,
    dimension: json.dimension,
    created: json.created
  }
}