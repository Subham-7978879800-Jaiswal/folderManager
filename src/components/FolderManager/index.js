import React, { useEffect } from "react";
import "./FolderManager.css";
import "../../global.css";
import useFolderTree from "../../Hooks/useFolderTree";
import FolderView from "../FolderView";
import Spinner from "react-bootstrap/Spinner";
import { useStoreProvider } from "../../Store/store";

function FolderManager() {
  const { getFolderTreeServiceCall, folderTree } = useFolderTree();
  const { loaderOnFolderDetailLoad } = useStoreProvider();

  useEffect(() => {
    getFolderTreeServiceCall();
  }, []);

  return (
    <div>
      {loaderOnFolderDetailLoad && (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {folderTree && <FolderView data={folderTree}></FolderView>}
    </div>
  );
}

export default FolderManager;
