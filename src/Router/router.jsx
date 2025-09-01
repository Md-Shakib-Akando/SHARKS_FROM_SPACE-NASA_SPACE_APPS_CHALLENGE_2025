import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import RootLayOut from "../LayOuts/RootLayOut";
import Analaytics from "../Components/Analaytics";
import Conservation from "../Components/Conservation";
import LiveTrack from "../Components/LiveTrack";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayOut,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'analytics',
                Component: Analaytics,
            },
            {
                path: 'conservation',
                Component: Conservation,
            },
            {
                path: 'liveTracking',
                Component: LiveTrack,
            }
        ]
    },

]);