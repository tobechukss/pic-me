import { initializeApp } from "firebase/app";
import firebaseConfig from "../auth/constants"
import Navbar from "./Navigation";
import {getFirestore, collection, getDocs, addDoc} from "firebase/firestore"
import { useEffect, useState } from "react";
const Beauty= () => {
    const the_app = initializeApp(firebaseConfig);
    const db = getFirestore()
    const colRef = collection(db, "photo-dump")
    const [women, setWomen] = useState([])
    const [imgs, setImgs] = useState("")
    useEffect(()=> {
        
        function getting() {
            getDocs(colRef)
            .then((snapshot) => {
                let x=[]
                snapshot.docs.forEach((doc)=> {
                   
                    if (doc.data().formData.beauty) {
                        console.log(doc.data().formData)
                        x.push(doc.data())
                      
                    }
                   
         
                })
                setWomen(x)
              
               
                
    
            })
            .catch(err => {
                console.log(err.message)
            })
        }

        getting()
       
       
    },[])

    console.log(women)
    let girls_stuff = women.map((girlies, index)=> {
      return    <a href={girlies.url} key={index} target="_blank"><div className="w-72 h-72 ">
      <div className="flex h-60 w-60">
        <img src={girlies.url} alt="girls" className="w-full object-cover h-auto rounded-3xl"/>
      </div>
      </div>
      </a>
    })
    return (
        <div className="bg-fuchsia-200 min-h-screen">
          
        <Navbar/>
        <div className="pt-20 pb-10">
        <h1 className="text-7xl text-center heading">Beauty Shots</h1>
        <p className="text-center">Click images to be redirected to their urls</p>
        
        </div>
        
        <div className="flex h-auto w-screen px-20 py-0 flex-wrap">
            {girls_stuff}
           
       
        </div>


        </div>
    )
}

export default Beauty