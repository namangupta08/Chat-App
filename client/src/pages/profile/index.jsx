import { useAppStore } from "@/store";
import { useState } from "react";

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  return (
    <div>
      profile
      <div>{userInfo.email}</div>
    </div>
  );
};

export default Profile;
