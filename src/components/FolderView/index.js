import "./FolderView.css";
import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Example from "../Modal";
import FilterDropDown from "../FilterDropDown";

const RecursivelyGenerateElementTree = ({ data, i, rawData }) => {
  const clickhandler = (obj) => {
    const textSelector = `#id_${obj.currentTarget.children[0].children[1].textContent.replace(
      /\s/g,
      "_"
    )}`;

    const chevronSelector =
      `#id_${obj.currentTarget.children[0].children[1].textContent}_chevron`
        .replace(/\s/g, "_")
        .toString();

    const cardClassList = document.querySelector(textSelector).classList;

    const chevron = document.querySelector(chevronSelector).classList;

    if (cardClassList.contains("show-card")) {
      cardClassList.remove("show-card");
      cardClassList.add("hide-card");
      chevron.remove("down-chevron");
      chevron.add("right-chevron");
    } else {
      cardClassList.remove("hide-card");
      cardClassList.add("show-card");
      chevron.remove("right-chevron");
      chevron.add("down-chevron");
    }
  };

  return data.map((obj) => {
    return (
      <div key={obj.virtual_id} style={{ marginLeft: `${50 * i}px` }}>
        {obj?.children?.length > 0 && (obj.show || obj.show === undefined) && (
          <>
            <div onClick={clickhandler} className="card">
              <div>
                <form
                  className="checkbox-form"
                  id={obj.virtual_id}
                  onClick={(event) => {
                    event.stopPropagation();
                    // console.log(
                    //   document
                    //     .querySelector("#" + obj.virtual_id)
                    //     .getAttribute("data")
                    // );
                  }}
                  style={{ display: "inline-block", marginRight: "10px" }}
                  data={JSON.stringify(obj)}
                >
                  <Form.Check className="custom-checkbox" type={"checkbox"} />
                </form>
                <span style={{ width: "200px" }}>{obj.name}</span>
              </div>

              <span id={`id_${obj.name}_chevron`.replace(/\s/g, "_")}>
                <FiChevronDown className="down-chevron" />
              </span>
            </div>
            <div className={"show"} id={`id_${obj.name.replace(/\s/g, "_")}`}>
              <RecursivelyGenerateElementTree
                data={obj.children}
                i={i + 1}
                rawData={rawData}
              ></RecursivelyGenerateElementTree>
            </div>
          </>
        )}

        {obj?.children === undefined && <div className="card">{obj.name}</div>}
      </div>
    );
  });
};

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
          console.log(jstParent);
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

  const filterSaveHandler = (data) => {
    setFilter(data);
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

  console.log("***", filteredData);

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
