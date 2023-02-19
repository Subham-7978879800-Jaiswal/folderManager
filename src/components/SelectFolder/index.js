import { useEffect } from "react";
import useFolderTree from "../../Hooks/useFolderTree";
import "../../global.css";
import FolderView from "../FolderView";

const SelectFolder = () => {
  const { getFolderTreeServiceCall, folderTree } = useFolderTree();

  useEffect(() => {
    getFolderTreeServiceCall();
  }, []);

  return <div>{folderTree && <FolderView data={folderTree}></FolderView>}</div>;
};

export default SelectFolder;
