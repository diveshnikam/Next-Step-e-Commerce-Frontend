import FilterToggle from "./FilterToggle";

const Discription = ({ description }) => {
  return (
    <>
      <FilterToggle title={"Description"}>
        <div
          className="p-3 bg-white  mt-2 mb-4"
          style={{
            lineHeight: "1.7",
            color: "#333",
            fontSize: "16px",
            fontWeight: "400",
            letterSpacing: "0.3px",
          }}
        >
          {description}
        </div>
      </FilterToggle>
    </>
  );
};

export default Discription;
