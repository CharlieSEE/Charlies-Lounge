import LandingPage from "./LandingPage";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Pages/Landing Page",
  component: LandingPage,
};

export const Page = () => (
  <BrowserRouter>
    <LandingPage />
  </BrowserRouter>
);
