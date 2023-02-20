import axios from "axios";
import { useState } from "react";
import { useStoreProvider } from "../Store/store";

const useFolderTree = () => {
  const [folderTree, setFolderTree] = useState();
  const { updateLoaderOnFolderDetailLoad } = useStoreProvider();

  const recursivelyStoreAllFiles = async (data) => {
    await data.forEach(async (obj) => {
      if (obj.children.length > 0) {
        await recursivelyStoreAllFiles(obj.children);
      } else {
        const result = await axios.post(`/rpc.FolderService/Items`, {
          folderId: `${obj.virtual_id}`,
        });
        obj.children = result.data.items;
        return obj;
      }
    });
    return data;
  };

  const getRootFiles = async (data) => {
    return await recursivelyStoreAllFiles(data);
  };

  const getFolderTreeServiceCall = async () => {
    const result = await axios.post(`/rpc.FolderService/Tree`, {});

    const keys = Object.keys(result.data);
    let tree = [];
    for (let i = 0; i < keys.length; i++) {
      tree.push(result.data[keys[i]]);
    }

    tree = tree.flat(1);

    const fresult = await getRootFiles(tree);
    updateLoaderOnFolderDetailLoad(true);
    setTimeout(() => {
      setFolderTree(fresult);
      updateLoaderOnFolderDetailLoad(false);
    }, 10000);
  };

  return {
    folderTree,
    getFolderTreeServiceCall,
  };
};

export default useFolderTree;
