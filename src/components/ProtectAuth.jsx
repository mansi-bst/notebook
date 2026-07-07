import react , {useEffect} from 'react'
import {useAuthState} from '../Contextapi/Authstate'
import { useNavigate } from 'react-router-dom'



function ProtectAuth({children}) {
   
    const navigate=useNavigate()
    const {isLogin}=useAuthState()
    useEffect(()=>{
        if(!isLogin){
            navigate('/login')
            return
        }
    },[])
  return <>{children}</>;
}

export default ProtectAuth