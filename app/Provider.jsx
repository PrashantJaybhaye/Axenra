"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { supabase } from "../services/Supabase";
import { UserDetailContext } from "../context/UserDetailContext";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    let { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user?.primaryEmailAddress.emailAddress);


    if (Users.length === 0) {
      const { data, error } = await supabase
        .from("Users")
        .insert([
          {
            name: user?.firstName,
            email: user?.primaryEmailAddress.emailAddress,
          },
        ])
        .select();
      setUserDetail(data[0]);
      return ;
    }

    setUserDetail(Users[0]);
  };

  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <div className="w-full">{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
