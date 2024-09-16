import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
 
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Lottie from "react-lottie";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/store";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";

const NewDm = () => {
    
    const {setSelectedChatType , setSelectedChatData} = useAppStore();
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setsearchedContacts] = useState([]);

  const searchContact = async (searchTerm) => {
    console.log(searchTerm);
    // if (searchTerm.length === 0) {
    //   // Reset searchedContacts if the search term is empty
    //   setsearchedContacts([]);
    //   return;
    // }
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );

        console.log(response.data.contacts);

        if (response.status === 200 && response.data.contacts) {
          setsearchedContacts(response.data.contacts);
        }
      }else{
        setsearchedContacts([]);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const selectNewContact = (contact) => {
    setOpenNewContactModel(false)
    setSelectedChatType("contact");
    setSelectedChatData(contact)
    setsearchedContacts([]);
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setOpenNewContactModel(true)}
              className=" text-opacity-90 text-neutral-400 font-light text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] h-[400px] border-none w-[400px] flex text-white flex-col">
          <DialogHeader>
            <DialogTitle className="text-center">
              Please Select a Contact
            </DialogTitle>
            {/* <DialogDescription>
              
            </DialogDescription> */}
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className=" rounded-lg bg-[#2c2e3b] border-none mt-3"
              onChange={(e) => searchContact(e.target.value)}
            />
          </div>
          {
            searchContact.length > 0 && (
              <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex cursor-pointer gap-3 items-center"
                  onClick={() => selectNewContact(contact)}
                >
                  <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt="profile"
                          className="object-cover w-full h-full bg-black rounded-full"
                          getColor
                        />
                      ) : (
                        <div
                          className={`h-12 w-12 uppercase text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                            contact.color
                          )}`}
                        >
                          {contact.firstName
                            ? contact.firstName.split("").shift()
                            : contact.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                      <span>
                                  {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : `${contact.email}`}
                      </span>
                      <span className="text-xs">
                        {contact.email}
                      </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
            )
          }
          
          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:flex flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className="text-white font-mediumtext-opacity-80 flex flex-col gap-5 items-center mt-5 mb-16 lg:text-2xl text-xl transition-all duration-300 text-center">
                <h3 className="poppins-medium"> Hi
                  <span className="text-purple-500">! </span>
                  Search new{" "}
                  <span className="text-purple-500 font-semibold">Contact</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
