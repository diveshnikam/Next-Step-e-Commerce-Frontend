import { Link } from "react-router-dom";

const Category = () => {
  const items = [
    {
      to: "/products/Lifestyle",
      alt: "Lifestyle",
      src: "https://res.cloudinary.com/di71zb4sb/image/upload/v1759416141/high-angle-woman-putting-ice-skates_vp41bm.jpg",
      title: "Lifestyle",
    },
    {
      to: "/products/Running",
      alt: "Running",
      src: "https://res.cloudinary.com/di71zb4sb/image/upload/v1759363292/side-view-woman-man-running-track_1_nyrrtp.jpg",
      title: "Running",
    },
    {
      to: "/products/Training",
      alt: "Training",
      src: "https://res.cloudinary.com/di71zb4sb/image/upload/v1759363155/Screenshot_2025-10-02_at_5.18.31_AM_ladkff.png",
      title: "Training",
    },
    {
      to: "/products/Jordan",
      alt: "Jordan",
      src: "https://res.cloudinary.com/di71zb4sb/image/upload/v1759363155/Screenshot_2025-10-02_at_5.27.50_AM_khcjcv.png",
      title: "Jordan",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row g-2 g-md-5">
        {items.map(({ to, alt, src, title }) => (
          <div className="col-6 col-md-3" key={alt}>
            <Link to={to} className="text-decoration-none text-reset">
              <div className="ratio ratio-4x3">
                <img
                  src={src}
                  alt={alt}
                  className="w-100 h-100 object-fit-cover rounded-3 category-img"
                  style={{ objectPosition: "center" }}
                />
                
              </div>
              <h5 className="text-center mt-3 hover-underline">{title}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
