import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg' 

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Yo, go check your email, buddy. Psst... be sure to check your spam folder.')
    } catch (error) {
      toast.error('Hmmm, we couldn\'t send your reset... guess you\'re SOL')
    }
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form action="" onSubmit={onSubmit}>
          <input 
            type="email" 
            className='emailInput' 
            placeholder='Email' 
            id='email' 
            value={email} 
            onChange={onChange} 
          />
          <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword