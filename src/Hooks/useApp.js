import axios from "axios";
import { useStoreProvider } from "../Store/store";

const { REACT_APP_API_HOST } = process.env;

function useApp() {
  const { updateApps } = useStoreProvider();

  const getAllAppsServiceCall = async () => {
    const res = await axios.post(`${REACT_APP_API_HOST}/Apps`, {
      my_apps: true,
      category: "",
    });

    updateApps(res?.data?.apps);
  };

  return { getAllAppsServiceCall };
}

export default useApp;
