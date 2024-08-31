import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { useState, useEffect} from "react";
import MainLayout from './layouts/MainLayout';
import HomePage from "./pages/HomePage";
import ArtistsPage from "./pages/ArtistsPage";
import ArtistPage, { artistLoader } from "./pages/ArtistPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from './pages/Signup';
import ArtistDashboard from "./pages/ArtistDashboard";
import UserDashboard from "./pages/UserDashboard";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isArtist, setIsArtist] = useState(false);

  // Bad workaround for the lack of working cookies in the application
  // Functionally means the logout page is just symbolic 
  const [artistUsername, setArtistUsername] = useState("");
  const [artistPassword, setArtistPassword] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState(""); 

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout isLoggedIn={isLoggedIn} />}>
        <Route index element={<HomePage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route
          path="/artists/:index"
          element={<ArtistPage />}
          loader={artistLoader}
        />
        <Route
          path="/login"
          element={
            <Login
              artistUsername={artistUsername}
              setArtistUsername={setArtistUsername}
              artistPassword={artistPassword}
              setArtistPassword={setArtistPassword}
              userUsername={userUsername}
              setUserUsername={setUserUsername}
              userPassword={userPassword}
              setUserPassword={setUserPassword}
              setIsLoggedIn={setIsLoggedIn}
              setIsArtist={setIsArtist}
            />
          }
        />
        <Route
          path="/logout"
          element={<Logout setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={
            isArtist ? (
              <ArtistDashboard
                artistUsername={artistUsername}
                artistPassword={artistPassword}
              />
            ) : (
              <UserDashboard
                userUsername={artistUsername}
                userPassword={artistPassword}
              />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;



    // const processVenueFormat = (venue) => {
    //   const venueDate = new Date(venue["venue-date"]);
    //   const partitionedDate = venue["venue-date"].split("-");
    //   const dayNumber = partitionedDate[partitionedDate.length - 1];

    //   const dayNames = [
    //     "Sunday",
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday",
    //     "Friday",
    //     "Saturday",
    //   ];
    //   const monthNames = [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ];

    //   let day = dayNames[venueDate.getDay()];
    //   let month = monthNames[venueDate.getMonth()];

    //   return {
    //     month: month,
    //     day_number: dayNumber,
    //     day_str: day,
    //     name: venue["venue-loc"],
    //     time: venue["venue-time"],
    //     link: venue["venue-link"],
    //   };
    // };