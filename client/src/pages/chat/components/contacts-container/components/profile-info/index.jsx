import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { IoPowerSharp } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { getColor } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
  

const ProfileInfo = () => {
  const { userInfo , setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
        const res = await apiClient.post(LOGOUT_ROUTE,{}, {withCredentials:true})

        if(res.status === 200){
            navigate("/auth")
            setUserInfo(null)
        }
    } catch (error) {
        console.log(error)
    }
  }



  return (
    <div className="absolute bottom-0 flex justify-between items-center h-16 px-10 w-full bg-[#2a2b33]">
      <div className="flex items-center justify-center gap-3">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black rounded-full"
                getColor
              />
            ) : (
              <div
                className={`h-12 w-12 uppercase text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><FiEdit2 
            onClick={() => navigate('/profile')}
            className=" text-purple-500 text-xl font-medium"/></TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <IoPowerSharp 
            onClick={logOut}
        className=" text-red-500 text-xl font-medium"
            /> 
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
