import React, { createContext, useState } from 'react';

// Demo users
export const demoUsers = [
  {
    id: 1,
    username: 'nomzod1',
    password: '123',
    role: 'candidate',
    name: "Aliyev Vali Akbar o'g'li",
    region: 'Toshkent',
  },
  {
    id: 2,
    username: 'voenkomat1',
    password: '123',
    role: 'voenkomat',
    name: 'Karimov Otabek',
    region: 'Toshkent',
  },
  {
    id: 3,
    username: 'otm1',
    password: '123',
    role: 'university',
    name: 'Rahimova Dilnoza',
    region: 'Toshkent',
  },
  {
    id: 4,
    username: 'admin1',
    password: '123',
    role: 'admin',
    name: 'Administrator',
    region: 'Markaziy',
  },
];

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const foundUser = demoUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return { success: true, user: foundUser };
    }
    return { success: false, message: 'Login yoki parol xato!' };
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'candidate',
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
