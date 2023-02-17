import axios from "axios";
import { useState } from "react";

const useFolderTree = () => {
  const [folderTree, setFolderTree] = useState();

  const getFolderTreeServiceCall = async () => {
    const result = await axios.post(`/rpc.FolderService/Tree`, {});
    setFolderTree(result.data);
  };

  return {
    folderTree,
    getFolderTreeServiceCall,
  };
};

export default useFolderTree;
