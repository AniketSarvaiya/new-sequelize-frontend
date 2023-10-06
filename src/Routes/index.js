import Students from "../components/Students";
import SignUp from "../pages/SignUp";
import Borrow from "../pages/Borrow";
import Home from "../pages/Home";
import Book from "../pages/Book";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import AdminSignIn from "../pages/AdminSignIn";
import Page404 from "../pages/Page404";
import AdminBooks from "../pages/AdminBooks";
export const ROUTES = [
  {
    item: "Students",
    path: "/student",
    Component: Students,
    isPrivate: true,
    onNavbar: true,
    role: "admin",
  },
  {
    item: "Books",
    path: "/books",
    Component: AdminBooks,
    isPrivate: true,
    onNavbar: true,
    role: "admin",
  },
  {
    item: "Home",
    path: "/home",
    Component: Home,
    isPrivate: true,
    isAdmin: true,
    onNavbar: true,
    role: "user",
  },
  {
    item: "Book",
    path: "/book",
    Component: Book,
    isPrivate: true,
    onNavbar: true,
    role: "user",
  },
  {
    item: "SignUp",
    path: "/signup",
    Component: SignUp,
    isPrivate: false,
    onNavbar: true,
  },
  {
    item: "SignIn",
    path: "/",
    Component: SignIn,
    isPrivate: false,
    onNavbar: true,
  },
  {
    item: "Borrow",
    path: "/borrow",
    Component: Borrow,
    isPrivate: true,
    onNavbar: true,
    role: "user",
  },

  {
    item: "Profile",
    path: "/profile",
    Component: Profile,
    isPrivate: true,
    onNavbar: false,
    role: "user",
  },
  {
    item: "Profile",
    path: "/adminprofile",
    Component: Profile,
    isPrivate: true,
    onNavbar: false,
    role: "admin",
  },
  {
    item: "404",
    path: "/*",
    Component: Page404,
    isPrivate: false,
    onNavbar: false,
  },
  {
    item: "AdminSignIn",
    path: "/admin",
    Component: AdminSignIn,
    isPrivate: false,
    onNavbar: false,
  },
];
