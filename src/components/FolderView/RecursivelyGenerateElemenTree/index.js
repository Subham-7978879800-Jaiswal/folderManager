import { FiChevronDown } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import { useStoreProvider } from "../../../Store/store";

export const RecursivelyGenerateElementTree = ({ data, i, rawData }) => {
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

  const { filterExtensions } = useStoreProvider();

  console.log(filterExtensions);

  return data.map((obj) => {
    return (
      <div key={obj.virtual_id} style={{ marginLeft: `${50 * i}px` }}>
        {obj?.children?.length >= 0 && (obj.show || obj.show === undefined) && (
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

        {obj?.children === undefined && (
          <div
            style={{
              backgroundColor: `${
                filterExtensions.includes(obj?.name?.split(".")[1])
                  ? "yellow"
                  : ""
              }`,
            }}
            className="card"
          >
            {obj.name}
          </div>
        )}
      </div>
    );
  });
};
export default RecursivelyGenerateElementTree;
