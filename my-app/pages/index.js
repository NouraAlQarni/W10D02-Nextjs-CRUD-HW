import Head from 'next/head'
import { useEffect, useState } from 'react';
import axios from 'axios';


export const getStaticProps = async () => {
  const res = await axios.get('http://localhost:3000/api/planets')
  console.log(res.data.data)
  
  return {
      props: {
          data:res.data.data
    }
}
}


export default function Home({data}) {
    
  const [planets,setPlanets] = useState(data);
  const [name,setName] = useState();
  const [moon,setmoon] = useState();
  const [lengthDay,setlengthDay] = useState();
  const [img,setImg] = useState();


  // Add Planets

  const addPlanets = (e) => {
      e.preventDefault()
        axios.post("http://localhost:3000/api/planets", {
             data: {
               PlanetName: name,
               NumberOfMoon: moon,
               LengthOfDay: lengthDay,
               img: img
              }} 
        ).then(
          (res) => {
            setPlanets(res.data.data);
          })
  }

  // Updata

  // Delete 

  const deletePlanet = (e,_id) => {
      e.preventDefault()
      axios.delete(`http://localhost:3000/api/planets/${_id}`
      ).then(
        (res) => {
        setPlanets(res.data.data);
  })
 }

  return (

    <div>
      <Head>
        <title>Planets</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Planets</h1><br/><br/><br/>
      <div className = "card">
      {
        planets.map( (element) => {
        return (
          <div class="card text-center col-5 mx-auto m-3">
             <div class="card-header">
                <img  src={element.img} height = {225} width = {225}></img>
                 <div class="card-body">
                    <h3 class="card-text"> Name : {element.PlanetName}</h3> 
                    <h4 class="card-text"> Moons : {element.NumberOfMoon}</h4>
                    <h4 class="card-text"> Length Of Day : {element.LengthOfDay}</h4>
                    <br/><br/><button type="submit" onClick = {(e)=> {deletePlanet(e,element._id)}}>Remove</button><br/><br/><br/><br/>
                  </div>
              </div>
          </div>
        )
      })}
      </div>

      {console.log(planets)}


      <h1>Add Planets</h1><br/><br/>
          <form>
  
            <input onChange={(e)=>{setName(e.target.value)}} placeholder=" Planet Name :"></input><br/>
            <input onChange={(e)=>{setmoon(e.target.value)}} placeholder=" Moons :"></input><br/>
            <input onChange={(e)=>{setlengthDay(e.target.value)}} placeholder=" Day :"></input><br/>
            <input onChange={(e)=>{setImg(e.target.value)}} placeholder=" image :"></input><br/>
            <br/><br/><button type="submit" onClick= {(e)=>addPlanets(e)}>Submit</button><br/><br/>

          </form> 

       </div>
  )
}
