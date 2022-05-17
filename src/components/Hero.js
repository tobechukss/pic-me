
import culture from "../assets/culture.jpg"
import { useState, useEffect } from "react";
import { getAuth, signInWithPopup,GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {getFirestore, collection, getDocs, addDoc} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import firebaseConfig from "../auth/constants";
import { initializeApp } from 'firebase/app';
import Modal from 'react-modal';
import React from 'react';
Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.7)';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };




export default function Hero() {
    const app = initializeApp(firebaseConfig);
    const [user, setUser] =useState("")
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
      beauty:"",
      memes: "",
      art:"",
      nature:"",
      activities:"",
      nollywood:"",
      night:"",
      illustration:""

    })
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const db = getFirestore()
    const colRef = collection(db, "photo-dump")
    const [progresspercent, setProgresspercent] = useState(0);
    const storage = getStorage();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log("done")
 
   // const user = result.user;
  
  }).catch((error) => {
      console.log(error)
    throw Error("Could not sign in. Check your google account access.")
  });
      }

      useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log("logged in")
              setUser(true)
            } else {
              setUser(false)
            }
          });
          
      }, [])

      function openModal() {
        setIsOpen(true);
       
      }
      function closeModal() {
        setIsOpen(false);
      }
      function handleChange(event) {
          const {name, checked} = event.target
          setFormData(prevFormData => {
              return {
                  ...prevFormData,
                  [name]: checked
              }
          })

         
      }

      const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(e.target[8]?.files[0])
        const file = e.target[8]?.files[0]
    
    
        if (!file) return;
     
        const storageRef = ref(storage, `photos/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
     
        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
            setTimeout(() => {
              setFormData({
                beauty:"",
          memes: "",
          art:"",
          nature:"",
          activities:"",
          nollywood:"",
          night:"",
          illustration:""
              })
              setProgresspercent(0)
                closeModal()
            }, 4000);
          },
          (error) => {
            alert(error);
          },
         () => {
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           
              addDoc(colRef, {
                  name:file.name,
                formData,
                url: downloadURL
    
              })
              
            });
          }
        );
      
      }
     
    return (
        <div className="flex flex-col z-10 sm:h-[27rem]  md:bg-transparent bg-cyan-900 h-[47rem]  w-screen">
     
         
             
            <img src={culture} alt="object-fill h-auto relative z-0"/>
            <div className="absolute z-0 overflow-hidden   md:bg-transparent bg-cyan-900  w-full top-48">
                <div className="w-4/6  m-auto bg-cyan-900/[0.8]  px-4 py-8">
                <h1 className="heading text-5xl text-white m-auto text-center">Your Open Source Nigerian Stock Photo Library.</h1>
            <p className="text-white mt-4 font-bold text-lg text-center  m-auto max-w-lg">Do you ever get tired of your brand using that one picture of that girl? You know,
                the one every new startup uses. Are you unable to afford illustrators and photograhy agencies? Well, we are here for you. Gone are the
                days where Nigerians are forced to use stock photos that don't look like us, Pic me is here to solve that. Want to contribute? Sign up now.
            </p>
           { user?  <p className="m-auto max-w-max px-12 py-4 rounded-xl mt-10 text-white font-bold bg-blue-500 cursor-pointer" onClick={openModal}>Contribute</p>:<p className="m-auto max-w-max px-12 py-4 rounded-xl mt-10 text-white font-bold bg-blue-500 cursor-pointer" onClick={signInWithGoogle}>Sign up Now</p>}
                </div>
            
            </div>

            <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Contribute Modal"
        >
        
          
          <form  className='form ' onSubmit={handleSubmit}>
            <div className="text-lg ">
              <h1 className="heading text-2xl">Choose Image Category</h1>
           <div>
            <input type="checkbox" name="beauty" id="beauty" checked={formData.beauty} onChange={handleChange}/>
            <label className="px-2" htmlFor="beauty">Beauty Shots</label>
            </div>
            <div>
            <input type="checkbox" name="memes" id="memes" checked={formData.memes} onChange={handleChange}/>
            <label className="px-2" htmlFor="memes">Nigerian Memes</label>
            </div>
            <div>
            <div>
            <input type="checkbox" name="art" id="art" checked={formData.art} onChange={handleChange}/>
            <label className="px-2" htmlFor="art">Nigerian Dance</label>
            </div>
            <div>
            <input type="checkbox" name="nature" id="nature" checked={formData.nature} onChange={handleChange}/>
            <label className="px-2" htmlFor="nature">Nature</label>
            </div>
            <input type="checkbox" name="activities" id="activities" checked={formData.activities} onChange={handleChange}/>
            <label className="px-2"htmlFor="actiities">Nigerian Activities</label>
            </div>
            <div>
            <input type="checkbox" name="nollywood" id="nollywood" checked={formData.nollywood} onChange={handleChange}/>
            <label className="px-2" htmlFor="nollywood">Nollywood</label>
            </div>
            <div>
            <input type="checkbox" name="night" id="night" checked={formData.night} onChange={handleChange}/>
            <label className="px-2" htmlFor="night">Nigerian Night Life</label>
            </div>
            <div>
            <input type="checkbox" name="illustration" id="illustration" checked={formData.illustration} onChange={handleChange}/>
            <label className="px-2 " htmlFor="illustration">Nigerian themed Illustrations</label>
            </div>
            </div>
               <div className="mt-4">
          <input type='file' accept="image/*" />
        </div>
          
          <button className="hover:bg-red-900 hover:text-red-100 active:bg-red-900 rounded-xl sm:bg-orange-400 font-bold sm:text-red-100 text-amber-700 bg-orange-200 px-6 py-3 sm:max-w-max w-7/12 my-4 "
             type="submit" >
                Upload Picture
              </button>
              {progresspercent? <p>Upload Progress:{progresspercent}%</p>:""}
        </form>
        </Modal>
      </div>
    )
}