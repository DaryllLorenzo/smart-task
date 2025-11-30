"use client";

import api from "@/service/axios-global";

export const AuthService = {
  register: async (data: { name: string; email: string; password: string; }) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name" , data.name)
    //formData.append("energy_level", "medium") ;
   // formData.append("preferences", "") ;
    
   if(localStorage.getItem("access_token")){
      localStorage.removeItem("access_token");
   } 

    const res = await api.post("/auth/register", formData);
    
     // guardar token en localStorage
  
      localStorage.setItem("access_token", res.data.access_token);
    

    return res.data;
  },

  loginRequest: async (email:string, password:string) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const res = await api.post("/auth/login", formData , {
      headers: {
      "Content-Type": "application/x-www-form-urlencoded" , 
    }
    });

    // guardar token en localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", res.data.access_token);
    }

    return res.data;
  },

  me: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};
