import FilterToggle from './FilterToggle'


const Sizes = ({sizes, selectedSize, setSelectedSize}) => {
    return (
        <>
        <FilterToggle title={"Select Size"}>

             <div className="d-flex flex-wrap gap-3 mt-2">
                    {sizes.map((s, i) => (
                      <div
                        key={i}
                        className={`border fw-bold thumnail-image bg-white text-black rounded-2 d-flex justify-content-center align-items-center mb-3 p-1 
          ${selectedSize === s ? "border-black border-3" : "border-secondary"}`}
                        style={{
                          width: "65px",
                          height: "65px",
                          cursor: "pointer",
                          transition: "border-color 0.2s ease",
                        }}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s} UK
                      </div>
                    ))}
                  </div>

        </FilterToggle>
        </>
    )
}

export default Sizes