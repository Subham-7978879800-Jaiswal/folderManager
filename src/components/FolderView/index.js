import "./FolderView.css";

const recursivelyGenerateElementTree = (data, i) => {
  return data.map((obj) => {
    return (
      <div style={{ marginLeft: `${50 * i}px` }}>
        {obj?.children?.length > 0 && (
          <>
            <div
              onClick={(obj) => {
                console.log(obj.target.textContent);

                const classList = document.querySelector(
                  `#${obj.target.textContent.replace(/\s/g, "_")}`
                ).classList;

                if (classList.contains("show")) {
                  classList.remove("show");
                  classList.add("hide");
                } else {
                  classList.remove("hide");
                  classList.add("show");
                }
              }}
              className="card"
            >
              {obj.name}
            </div>
            <div className={"show"} id={obj.name.replace(/\s/g, "_")}>
              {recursivelyGenerateElementTree(obj.children, i + 1)}
            </div>
          </>
        )}

        {obj?.children === undefined && <div className="card">{obj.name}</div>}
      </div>
    );
  });
};

const FolderView = ({ data }) => {
  console.log(data);
  return <>{data && recursivelyGenerateElementTree(data, 0)}</>;
};

export default FolderView;
