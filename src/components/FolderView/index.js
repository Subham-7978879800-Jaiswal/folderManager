import "./FolderView.css";
import { useMemo, useState } from "react";
import RecursivelyGenerateElementTree from "./RecursivelyGenerateElemenTree";
import { Button } from "react-bootstrap";
import Example from "../Modal";
import FilterDropDown from "../FilterDropDown";

const FolderView = ({ data }) => {
  const [rawData, setRawData] = useState(data);
  const [accessFolder, setAccessFolder] = useState(false);
  const [filter, setFilter] = useState({
    jpg: false,
    pdf: false,
    csv: false,
    kml: false,
  });

  const getExtensionsAvailable = (data, filter, extensions, jstParent) => {
    return data.filter((obj) => {
      if (obj?.children?.length > 0) {
        return getExtensionsAvailable(obj.children, filter, extensions, obj);
      } else if (obj.children === undefined) {
        let res = false;
        jstParent?.children?.forEach((obj) => {
          if (obj.name && obj.name.includes(".")) {
            const extension = obj.name.split(".")[1];
            res = res || extensions.includes(extension);
          } else {
            res = false;
          }
        });
        if (res === false) {
          jstParent.show = false;
        } else {
          jstParent.show = true;
        }

        if (extensions.length === 0) {
          jstParent.show = true;
        }
      }
      return true;
    });
  };

  const filteredData = useMemo(() => {
    let extensions = new Set();

    for (let property in filter) {
      if (filter[property]) {
        extensions.add(property);
      }
    }

    return getExtensionsAvailable(data, filter, Array.from(extensions), data);
  }, [data, filter]);

  const filterSaveHandler = (data) => {
    setFilter(data);
  };

  return (
    <>
      {filteredData && (
        <>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              onClick={() => {
                Array.from(
                  document.querySelectorAll(".custom-checkbox")
                ).forEach((checkbox) => {
                  checkbox.children[0].checked = true;
                });
              }}
            >
              Give access To All
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                Array.from(
                  document.querySelectorAll(".custom-checkbox")
                ).forEach((checkbox) => {
                  checkbox.children[0].checked = false;
                });
              }}
            >
              Remove access To All
            </Button>
            <Button onClick={() => setAccessFolder(true)}>
              Show All Folders which App Can Access
            </Button>
            <Button variant="success">Modify Access Folder</Button>
            <FilterDropDown
              filterSaveHandler={filterSaveHandler}
            ></FilterDropDown>
          </div>
          {accessFolder && <Example setter={setAccessFolder} />}

          <RecursivelyGenerateElementTree
            data={filteredData}
            i={0}
            rawData={rawData}
          ></RecursivelyGenerateElementTree>
        </>
      )}
    </>
  );
};

export default FolderView;
