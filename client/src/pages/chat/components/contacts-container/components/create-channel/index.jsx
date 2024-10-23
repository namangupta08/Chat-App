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

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { Input } from "@/components/ui/input";

import { useAppStore } from "@/store";

import {
  CREATE_CHANNEL_ROUTE,
  GET_ALL_CONTACTS_ROUTE,
} from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
//import MultipleSelector from "@/components/ui/multipleSelect";
import MultipleSelector from 'components/ui/multipleselect';


const CreateChannel = () => {
  const { addChannel } =
    useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);

  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setselectedContacts] = useState([]);
  const [channelName, setchannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, {
        withCredentials: true,
      });

      console.log("create channel");
      console.log(response.data.contacts);

      setAllContacts(response.data.contacts);
    };
    getData();
  }, []);

  const createChannel = async () => {
    try {
      if (channelName.length > 0 && selectedContacts.length > 0) {
        const response = await apiClient.post(
          CREATE_CHANNEL_ROUTE,
          {
            name: channelName,
            members: selectedContacts.map((contact) => contact.value),
          },
          { withCredentials: true }
        );
        if(response.status === 201){
            setchannelName("");
            setselectedContacts([]);
            setNewChannelModal(false);
            addChannel(response.data.channel);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setNewChannelModal(true)}
              className=" text-opacity-90 text-neutral-400 font-light text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            <p>Create New Channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#181920] h-[400px] border-none w-[400px] flex text-white flex-col">
          <DialogHeader>
            <DialogTitle className="text-center">
              Please fill up the details for new channel
            </DialogTitle>
            {/* <DialogDescription>
                
              </DialogDescription> */}
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className=" rounded-lg bg-[#2c2e3b] border-none mt-3"
              onChange={(e) => setchannelName(e.target.value)}
              value={channelName}
            />
          </div>

          <div>
            <MultipleSelector
              className="rounded-lg border-none py-2 text-white bg-[#2c2e3b]"
              defaultOptions={allContacts}
              placeholder="Search Contacts"
              value={selectedContacts}
              onChange={setselectedContacts}
              emptyIndicator={
                <p className="text-lg text-center leading-10 text-gray-600">
                  No contacts found
                </p>
              }
            />
          </div>

          <div>
            <Button
              onClick={createChannel}
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
