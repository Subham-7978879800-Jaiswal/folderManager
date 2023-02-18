import React from "react";
import FullScreenCard from "../FullScreenCard";
import { useNavigate } from "react-router-dom";
import { useStoreProvider } from "../../Store/store";
import "./Home.css";

function Home() {
  const { apps } = useStoreProvider();
  const navigate = useNavigate();

  return (
    <div>
      {apps &&
        apps?.map((app, index) => (
          <div key={index} onClick={() => navigate(`/${app?.title}`)}>
            <FullScreenCard>
              <h3>App Name - {app?.title.toUpperCase()}</h3>
              App Description - {app?.description}
            </FullScreenCard>
          </div>
        ))}
    </div>
  );
}

export default Home;
