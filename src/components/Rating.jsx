const Rating = ({data}) => {

     const stars =
    data?.rating >= 5 ? (
      <>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
      </>
    ) : data?.rating >= 4.5 ? (
      <>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-half"></i>
      </>
    ) : data?.rating >= 4 ? (
      <>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
      </>
    ) : data?.rating >= 3.5 ? (
      <>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-half"></i>
      </>
    ) : data?.rating >= 3 ? (
      <>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
      </>
    ) : data?.rating >= 2.5 ? (
      <>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-half"></i>
      </>
    ) : data?.rating >= 2 ? (
      <>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
      </>
    ) : data?.rating >= 1.5 ? (
      <>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-half"></i>
      </>
    ) : (
      <i className="bi bi-star-fill"></i>
    );




    return (
        <>
         
         
         <span className="me-2">{data.rating} </span> <span>{stars}</span>

        </>
  )
}

export default Rating