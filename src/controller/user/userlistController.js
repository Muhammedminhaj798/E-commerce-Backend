const getTitles = (req,res,next) => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    const fetchingData = data.slice(0,10).map((item) => ({
      id:item.id,
      title:item.title
    }))

    res.status(200).json({
      status:"success",
      data:fetchingData
    })
  })
}

export default getTitles