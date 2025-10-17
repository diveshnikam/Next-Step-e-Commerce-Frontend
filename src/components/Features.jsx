import FilterToggle from "./FilterToggle";

const Features = ({ features }) => {
  return (
    <FilterToggle title={"Features"}>
      <ul
        className="list-unstyled p-3 bg-white rounded-3  mt-3 mb-5"
        style={{
          lineHeight: "1.8",
          color: "#222",
          fontSize: "16px",
          fontWeight: "400",
        }}
      >
        {features.map((f, i) => {
          return (
            <li
              key={i}
              className="d-flex align-items-start mb-2"
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "6px",
              }}
            >
             
              <span>{f}</span>
            </li>
          );
        })}
      </ul>
    </FilterToggle>
  );
};

export default Features;
