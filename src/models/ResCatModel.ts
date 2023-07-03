export type ResCatModel = {
  data : resCatObj[]
}

export type resCatObj = {
  foodCatId : string,
  foodCatName : string,
  foodCatImg : string,
  Restaurant : resCatChildObj[]
}

export type resCatChildObj = {
  foodCatResId : string,
}
