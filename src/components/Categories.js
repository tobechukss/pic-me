import firebaseConfig from "../auth/constants"
import { initializeApp } from "firebase/app";
import { Link } from "react-router-dom";
import {getFirestore, collection, getDocs, addDoc} from "firebase/firestore"
import Navbar from "./Navigation";


export default function Categories() {
    const the_app = initializeApp(firebaseConfig);
    const db = getFirestore()
    const colRef = collection(db, "photo-dump")
    function getThem() {
          getDocs(colRef)
  .then((snapshot) => {
      let books = []
      snapshot.docs.forEach((doc)=> {
          if (doc.data().formData.nature) {
            books.push({...doc.data()})
          }
         
      
          
      })
     
      console.log(books)
      

  })
  .catch(err => {
      console.log(err.message)
  })
    }
    getThem()
    return (
        <div className="">
            <Navbar/>
        <div className="w-screen flex-col bg-indigo-200 min-h-screen py-20 px-20">
            <h1>Click</h1>
          <Link to="beauty-shots">  <div className="w-full h-40 bg-indigo-400 mb-5 text-center">
                <p className="heading  text-3xl  md:text-6xl m-auto pt-10 text-center">Beauty Shots</p>
            </div></Link>
            <Link to="memes">  <div className="w-full h-40 bg-indigo-400 mb-5 text-center">
                <p className="heading text-3xl  md:text-6xl m-auto pt-10 text-center">Nigerian Memes</p>
            </div></Link>
            <Link to="activities">  <div className="w-full h-40 bg-indigo-400 mb-5 text-center">
                <p className="heading  text-3xl md:text-6xl m-auto pt-10 text-center">Nigerian Activities</p>
            </div></Link>
            <Link to="dance">  <div className="w-full h-40 bg-indigo-400 mb-5 text-center">
                <p className="heading text-3xl  md:text-6xl m-auto pt-10 text-center">Nigerians Dancing</p>
            </div></Link>
            <Link to="nature-naija">  <div className="w-full h-40 bg-indigo-400 mb-5 text-center">
                <p className="heading text-3xl  md:text-6xl m-auto pt-10 text-center">Nature in Nigeria</p>
            </div></Link>
            <Link to="night-life">  <div className="w-full h-40 bg-indigo-400 mb-5 text-center">
                <p className="heading text-3xl   md:text-6xl m-auto pt-10 text-center">Nigerians Night life</p>
            </div></Link>
            <Link to="illustrations">  <div className="w-full h-40 bg-indigo-400 mb-5 text-center">
                <p className="heading text-3xl   md:text-6xl m-auto pt-10 text-center">Nigerian Illustrations</p>
            </div></Link>
            <Link to="nollywood">  <div className="w-full h-40 bg-indigo-400 mb-5 text-center">
                <p className="heading text-3xl   md:text-6xl m-auto pt-10 text-center">Nigerians in Nollywood</p>
            </div></Link>
           
           
           
           
           
           

        </div>
        </div>
    )
}