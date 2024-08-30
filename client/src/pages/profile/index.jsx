//import React from 'react'

import { useAppStore } from "@/store"

function Profile() {
  const {userInfo} = useAppStore()
  return (
    <div>
      profile
      <div>
        email:{userInfo.email}
      </div>
    </div>
  )
}

export default Profile
