import { useEffect } from "react";
import useFolderTree from "../../Hooks/useFolderTree";
import "../../global.css";
import FolderView from "../FolderView";

const style = {
  width: window.innerWidth - 400,
};

const SelectFolder = () => {
  const { getFolderTreeServiceCall, folderTree } = useFolderTree();

  useEffect(() => {
    getFolderTreeServiceCall();
  }, []);

  return (
    <div style={style}>
      {folderTree && <FolderView data={folderTree}></FolderView>}
      <button>Restrict Folder</button>
    </div>
  );
};

export default SelectFolder;
