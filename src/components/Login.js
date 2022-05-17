import React, {useEffect, useState} from "react"
import { initializeApp } from "firebase/app";
import firebaseConfig from "../auth/constants";
import { getAuth, signInWithPopup,GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import agbani from "../assets/agbani.jpg"
import culture from "../assets/culture.jpg"
import generator from "../assets/generator.jpeg"
import kpuri from "../assets/kpuri.jpeg"
import patience from "../assets/patience.png"
import pawpaw from "../assets/pawpaw.jpg"
import nancy from "../assets/nancy.png"

const Login = () => {

   const cover = [agbani, culture, generator, kpuri, patience, pawpaw, nancy]
    const [displayImage, setDisplayImage] = useState("")
   
      const app = initializeApp(firebaseConfig);
    function pickCover() {
       let x = Math.floor(Math.random()*7)
       console.log(x)
       setDisplayImage(cover[x])
    }
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    

    

    useEffect(()=> {
       
        pickCover();
      
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log("logged in")
              let currentSite = window.location.origin
              window.location.href = currentSite + "/dashboard"
            } else {
              console.log("not logged in")
            }
          });
          
      
     
    }, [])

    const viewWeb = () => {
        let currentSite = window.location.origin
        window.location.href = currentSite + "/dashboard"
    }
    
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    localStorage.setItem("appTokenKey", token);
    let currentSite = window.location.origin
    window.location.href = currentSite + "/dashboard"
 
   // const user = result.user;
  
  }).catch((error) => {
    console.log(error)

    throw Error("Could not sign in. Check your google account access.")
  });
      }
    return (
        <div className="sm:flex w-screen h-screen bg-blue-400">
            <div className="h-screen sm:w-6/12 w-full">
            <img src={displayImage} alt="nigerian" className="h-full w-full object-cover "/>
            </div>
            <div className="sm:w-6/12 w-full px-2 sm:relative absolute bottom-0 m-auto sm:bg-transparent bg-blue-400/[0.6]">
                <h1 className="mb-5 heading text-7xl text-center text-blue-600">picme.Ng</h1>
                <p className="sm:max-w-md  max-w-xl m-auto text-xl text-blue-900 text-center">
                    The ultimate image repository for Nigerians. Find unique, high quality images, memes, stock photos, and illustrations for Nigerians and by Nigerians.
                    Sign up as a creator in order to contribute to the gallery.
                </p>
                <div className="sm:w-full w-full flex justify-center">
                    
                    <button className="hover:bg-blue-800  text-white  active:bg-blue-800 rounded-xl sm:bg-blue-900 font-bold  bg-blue-900 px-6 py-3 max-w-max my-4 " onClick={signInWithGoogle}>Become a Creator</button>
                    <button className="hover:border-blue-800 text-white bold  active:border-blue-800 rounded-xl mx-2 sm:border-blue-600 font-bold   border-2 border-blue-600 px-6 py-3 max-w-max my-4 " onClick={viewWeb}>View Web app</button>
                </div>
                
            </div>
    
        </div>
    )
}

export default Login