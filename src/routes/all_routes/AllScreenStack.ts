import { createStackNavigator } from '@react-navigation/stack';
import { postObj } from "../../models/PostModel";
import { orderObj } from "../../models/OrdersModel";

export type AllScreenStackParamList = {
  Splash : undefined,
  SignIn : undefined,
  SignUp : undefined,
  Main : undefined,
  ResProfile : undefined,
  Home : undefined,
  AddCat : undefined,
  AddFood : undefined,
  AddFoodCat : undefined,
  AddHomeSlider : undefined,
  PrivacyPolicy : undefined,
  TermAndCondition : undefined,
  AddDeals : undefined,
  InboxDetail : { receiverId : string },
  Video : { videoPath : string },
  Comments : {postData : postObj},
  Camera : undefined,
  AddPost : { videoPath : string},
  EditProfile : undefined,
  OrderDetail : { orderData : orderObj,orderTotal : number },
}

export const AllScreenStack = createStackNavigator<AllScreenStackParamList>();

