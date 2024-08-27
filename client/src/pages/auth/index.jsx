import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Background from '@/assets/login2.png'
import Victory from '@/assets/victory.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-client'
import { SIGNUP_ROUTE , LOGIN_ROUTE } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'



function Auth() {

  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("")

  const validateLogin = () => {
    if(!email.length){
      toast.error("Email is required")
      return false
    }
    if(!password.length){
      toast.error("Password is required")
      return false
    }
    
    return true 
  }
 

  const validateSignUp = () => {
    if(!email.length){
      toast.error("Email is required")
      return false
    }
    if(!password.length){
      toast.error("Password is required")
      return false
    }
    if(!confirmPassword.length){
      toast.error("Confirm Password is required")
      return false
    }

    if(password !== confirmPassword){
      toast.error("Password and confirm Password should be same")
      return false
    }
    return true
  }

  const handleLogin = async () => {
    if(validateLogin()){
      const response = await apiClient.post(LOGIN_ROUTE , {email , password} , {withCredentials:true})
      if(response.data.user.id){
        setUserInfo(response.data.user);
        if(response.data.user.profileSetup){
          navigate('/chat')
        }
        else{
          navigate('/profile');
        }
      }
      console.log(response)
    }
  }

  const handleSignup = async () => {
    if(validateSignUp()){
     const response = await apiClient.post(SIGNUP_ROUTE , {email , password} , {withCredentials:true})
     if(response.status == 201){
      setUserInfo(response.data.user);
      navigate('/profile')
     }
     console.log(response)
    }
  
  }



  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>

          <div className='flex flex-col items-center justify-center gap-10'>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-5xl font-bold md:text-6xl'>WELCOME</h1>
                    <img src={Victory} alt='Victory emoji' className='h-[100px]'/>
                </div>

                <p className='font-medium text-center'>
                  Fill in the details to get started with the best chat app
                </p>
            </div>

            <div className='flex items-center justify-center w-full'>
             <Tabs className='w-3/4' defaultValue='login'>
                <TabsList className='bg-transparent w-full rounded-none'>
                  <TabsTrigger value="login"
                  className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                  >Login</TabsTrigger>
                  <TabsTrigger 
                  className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                  value="signup">SignUp</TabsTrigger>
                </TabsList>

                <TabsContent className='flex flex-col gap-5 mt-10' value="login">
                  <Input 
                  value={email}
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input 
                  value={password}
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  onChange={(e) => setPassword(e.target.value)}
                  />

                <Button className='rounded-full p-6' onClick={handleLogin}>Login</Button>

                </TabsContent>
                <TabsContent className='flex flex-col gap-5' value="signup">
                  <Input 
                    value={email}
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-6"
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input 
                    value={password}
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-6"
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <Input 
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    type="password"
                    className="rounded-full p-6"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    />

                    <Button className='rounded-full p-6' onClick={handleSignup}>Sign Up</Button>
                </TabsContent>
             </Tabs>
            </div>
          </div>

          <div className='hidden xl:flex justify-center items-center'>
            <img src={Background} alt='background' className='h-[700px]'/>
          </div>
            
          
        </div>
    </div>
  )
}

export default Auth
