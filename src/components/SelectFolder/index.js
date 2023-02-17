import { useEffect } from "react";
import useFolderTree from "../../Hooks/useFolderTree";
import Alert from "react-bootstrap/Alert";
import FolderTree from "react-folder-tree";

const style = {
  width: window.innerWidth - 400,
};

const SelectFolder = ({ onFolderSelect }) => {
  const { getFolderTreeServiceCall, folderTree } = useFolderTree();

  const getFolderStructureFromObject = (data) => {
    return (
      <FolderTree
        onNameClick={(e) => {
          onFolderSelect(e.nodeData);
        }}
        showCheckbox={false}
        data={data}
      />
    );
  };

  const folderWithHeader = (key, folderContent) => {
    const filteredContent = folderContent.filter((data) => data.children);
    if (filteredContent.length === 0) {
      return;
    }
    return (
      <div>
        <Alert
          variant="success"
          className="m-2 mt-0"
          style={{ marginLeft: "10px" }}
        >
          {`${key}`.toUpperCase()} FOLDER
        </Alert>
        {filteredContent.map((data) => getFolderStructureFromObject(data))}
      </div>
    );
  };

  const getFolderStructure = () => {
    const keys = Object.keys(folderTree);
    let tree = [];
    for (let i = 0; i < keys.length; i++) {
      tree.push(folderWithHeader(keys[i], folderTree[keys[i]]));
    }
    return tree;
  };

  useEffect(() => {
    getFolderTreeServiceCall();
  }, []);

  return <div style={style}>{folderTree && getFolderStructure()}</div>;
};

export default SelectFolder;
