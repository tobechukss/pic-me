import { initializeApp } from "firebase/app";
import firebaseConfig from "../auth/constants"
import Navbar from "./Navigation";
import {getFirestore, collection, getDocs, addDoc} from "firebase/firestore"
import { useEffect, useState } from "react";
const Nature = () => {
    const the_app = initializeApp(firebaseConfig);
    const db = getFirestore()
    const colRef = collection(db, "photo-dump")
    const [nature, setNature] = useState([])
    const [imgs, setImgs] = useState("")
    useEffect(()=> {
        
        function getting() {
            getDocs(colRef)
            .then((snapshot) => {
                let x=[]
                snapshot.docs.forEach((doc)=> {
                   
                    if (doc.data().formData.nature) {
                        console.log(doc.data().formData)
                        x.push(doc.data())
                      
                    }
                   
         
                })
                setNature(x)
              
               
                
    
            })
            .catch(err => {
                console.log(err.message)
            })
        }

        getting()
       
       
    },[])

    console.log(nature)
    let natural_stuff = nature.map(denatured=> {
      return    <a href={denatured.url} target="_blank"><div className="w-72 h-72 ">
      <div className="flex h-60 w-60">
        <img src={denatured.url} alt="nature" className="w-full object-cover h-auto rounded-3xl"/>
      </div>
      </div>
      </a>
    })
    return (
        <div className=" bg-blue-200 min-h-screen">
          
        <Navbar/>
        <div className="pt-20 pb-10">
        <h1 className="text-7xl text-center heading">Nature</h1>
        <p className="text-center">Click images to be redirected to their urls</p>
        
        </div>
        
        <div className="flex h-auto w-screen px-20 py-0 flex-wrap">
            {natural_stuff}
           
       
        </div>


        </div>
    )
}

export default Nature