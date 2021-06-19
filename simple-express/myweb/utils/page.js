function page(tatolNum) {
    const total = count[0].tatol; //74
    const perPage = 10;
    const allPage = Math.ceil(total / perPage);
    const currPage = req.query.page || 1;
    const showInfoPage = (currPage -1) * perPage;
  }