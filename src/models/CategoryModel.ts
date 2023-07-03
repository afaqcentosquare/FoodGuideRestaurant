export type CategoryModel = {
  data : categoryObj[]
}

export type categoryObj = {
  menuCatId : string,
  menuCatName : string,
  menuCatImg : string,
  Food : foodObj[]
}

export type foodObj = {
  parentCatId : string,
  resId : string,
  foodCatName : string,
  foodDes : string,
  foodId : string,
  foodImg : string,
  foodName : string,
  foodPrice : string,
  foodRating : number,
}
