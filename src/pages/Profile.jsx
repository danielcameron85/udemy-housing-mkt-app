import React from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'



function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {name, email} = formData

  const navigate = useNavigate()
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name) {
        //update displayname in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        //Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error('Yo, homie! There was an error. We couldn\'nt update your info')
    }
  }
  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))  
  }

  return (
    <div className='profile'>
      <header className="profileHeader">
        <p className="pageHeader">Welcome, {auth.currentUser.displayName}!</p>
        <button className="logOut" type='button' onClick={onLogout}>Logout</button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
            {changeDetails? 'Done' : 'Change'}
          </p>
        </div>

        <div className="profileCard">
          <form action="">
            <input 
              type="text" 
              id="name" 
              className={!changeDetails ? 'profileName' : 'profileNameActive'} 
              disabled={!changeDetails} 
              value={name}
              onChange={onChange}
            />
            <input 
              type="email" 
              id="email" 
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
              disabled={!changeDetails} 
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile

