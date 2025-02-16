import "../styles/components/TopPanel.css";

function DropdownSelector(params) {

  return (
    <div className="selector">
      <span style={{ marginBottom: "0.1vw" }}>Select {params.itemType}</span>
      <select
        style={{ width: "20vw", marginBottom: "2vw" }}
        onChange={(e) => params.onSelect(e.target.value)}
        value = {params.selectedOption}
        disabled = {params.disabled}
      >
        {/* <option value={params.extraOption}> {params.extraOption} </option> */}

        {params.itemList.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default DropdownSelector;
