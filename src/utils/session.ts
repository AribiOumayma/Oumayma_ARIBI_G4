// src/utils/session.ts
let isLoggedIn = false;
let userEmail = '';

export const Session = {
  isLoggedIn: () => isLoggedIn,
  getUserEmail: () => userEmail,
  login: (email: string) => {
    isLoggedIn = true;
    userEmail = email;
  },
  logout: () => {
    isLoggedIn = false;
    userEmail = '';
  }
};