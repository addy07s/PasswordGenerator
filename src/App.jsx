import { use } from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)



  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*()_+"

    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length)

      pass+=str.charAt(char)
    }

setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword]) 
  
  const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,25)
    window.navigator.clipboard.writeText(passwordRef.current.value)
  },[password])



  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])



  return (
    <>

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3  text-orange-500 bg-gray-800'>
    <h1 className='text-2xl text-center text-white my-3 py-4 bottom-4 px-2'>Password Generator</h1>
      <div className='flex shadow rounded-3xl overflow-hidden mb-4 my-3'>

        <input type='text' value={password} className='outline-none w-full py-3 px-3'
        placeholder='password' readOnly  
        ref={passwordRef}/> 

        <button className='bg-blue-500 text-white px-4'
        onClick={copyPasswordtoClipboard}
        >Copy</button>
      </div>
      <div className='flex flex-col my-3'>
        <div className='flex justify-between'>
          <input type='range' min='8' max='25' value={length} className=' cursor-pointer w-full'
          onChange={(e)=>{setLength(e.target.value)}}/>
          <label className='text-white py-1 px-1'>Length:{length}</label>
          </div>
          <div className='flex justify-between'>
            <input type='checkbox' checked={numberAllowed} onChange={(e)=>{setNumberAllowed(e.target.checked)}}/>
            <label className='text-white'>Numbers</label>
          </div>
          <div className='flex justify-between'>
            <input type='checkbox' checked={charAllowed} onChange={(e)=>{setCharAllowed(e.target.checked)}}/>
            <label className='text-white'>Special Characters</label>
          </div></div>
    </div>
    </>
  )
}

export default App
