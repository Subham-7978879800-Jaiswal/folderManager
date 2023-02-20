import React, { useEffect } from "react";
import "./FolderManager.css";
import "../../global.css";
import useFolderTree from "../../Hooks/useFolderTree";
import FolderView from "../FolderView";

function FolderManager() {
  const { getFolderTreeServiceCall, folderTree } = useFolderTree();

  useEffect(() => {
    getFolderTreeServiceCall();
  }, []);

  return <div>{folderTree && <FolderView data={folderTree}></FolderView>}</div>;
}

export default FolderManager;
