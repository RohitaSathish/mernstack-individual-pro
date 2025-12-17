import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(savedUsers);
  }, []);

  const addUser = (userData) => {
    // Check if email already exists
    const existingEmail = users.find(user => user.email === userData.email);
    if (existingEmail) {
      return { success: false, message: "Email already registered!" };
    }

    // Check if name already exists
    const existingName = users.find(user => user.name === userData.name);
    if (existingName) {
      return { success: false, message: "Name already registered!" };
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      registeredDate: new Date().toISOString().split('T')[0]
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return { success: true, message: "Registration successful!" };
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};