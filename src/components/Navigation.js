import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { getAuth, signInWithPopup,GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseConfig from "../auth/constants";
import {getFirestore, collection, getDocs, addDoc} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from 'firebase/app';
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
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




const Navbar = () => {
  const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [user, setUser] =useState(false)
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
    setUser(true)
   // const user = result.user;
  
  }).catch((error) => {
      console.log(error)
    throw Error("Could not sign in. Check your google account access.")
  });
      }

      const signOutNow = () => {
        signOut(auth)
          .then(() => {
           setUser(false)
          })
          .catch((error) => {
            console.log(error)
          });
      };
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
  const [toggleMenu, setToggleMenu] = React.useState(false);
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
        <nav className="w-full flex md:justify-center fixed z-30 bg-indigo-600 justify-between items-center p-4">
      <div className="lg:flex-[0.8] md:flex-[0.5] flex-initial justify-center items-center">
       
        <p className="text-orange-50 heading text-4xl">picme.NG</p>
      </div>
      <ul className="text-white md:flex hidden font-bold text-md list-none flex-row justify-between items-center flex-initial">
        
      <Link to="/dashboard"><li className="mx-4 cursor-pointer ">Home</li></Link>
        <Link to="/categories"> <li className="mx-4 cursor-pointer">Categories</li></Link>

     { user? <li className="bg-[#bc715b] py-2 px-7 mx-4 rounded-md cursor-pointer hover:bg-[#2546bd]" onClick={openModal}>
          Contribute
        </li>: <li className="bg-[#bc715b] py-2 px-7 mx-4 rounded-md cursor-pointer hover:bg-[#2546bd]" onClick={signInWithGoogle}>
          Sign up
        </li>}
        {user && <li className="border-2 py-2 px-7 mx-4 rounded-md cursor-pointer hover:border-[#2546bd]" onClick={signOutNow}>
          Exit Creator Mode
        </li>}
        
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 bg-indigo-600 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2 "><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
           <Link to="/dashboard"> <li className="mx-4 text-xl cursor-pointer mb-10">Home</li></Link>
       <Link to="/categories"> <li className="mx-4 text-xl cursor-pointer mb-10">Categories</li></Link>
        { user? <li className="bg-[#bc715b] py-2 px-7 mx-4 rounded-md cursor-pointer hover:bg-[#2546bd]"onClick={openModal} >
          Contribute
        </li>: <li className="bg-fuschia-300 py-2 px-7 mx-4 rounded-md cursor-pointer hover:bg-[#2546bd]" onClick={signInWithGoogle}>
          Sign up
        </li>}
       {user && <li className="border-2 py-2 px-7 mx-4 rounded-md cursor-pointer hover:border-[#2546bd] mt-10" onClick={signOutNow}>
          Exit Creator Mode
        </li>}
       
          </ul>
        )}
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
    </nav>
    )
}

export default Navbar