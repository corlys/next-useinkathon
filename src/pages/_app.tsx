import { type AppType } from "next/dist/shared/lib/utils";
import { shibuya, UseInkathonProvider } from "@scio-labs/use-inkathon"
import { getDeployments } from "@/deployments"
import "@/styles/globals.css";

import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyApp: AppType = ({ Component, pageProps }) => {

  return <UseInkathonProvider defaultChain={shibuya} appName="retard-ink" deployments={getDeployments()}>
    <Component {...pageProps} />
    <ToastContainer />
  </UseInkathonProvider >;
};

export default MyApp;
