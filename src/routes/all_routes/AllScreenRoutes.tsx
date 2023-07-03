import React, {FC} from "react";
import { AllScreenStack } from "./AllScreenStack";
import SplashController from "../../ui/screens/splash/SplashController";
import SignUpController from "../../ui/screens/sign_up/SignUpController";
import SignInController from "../../ui/screens/sign_in/SignInController";
import HomeController from "../../ui/screens/home/HomeController";
import ResProfileController from "../../ui/screens/res_profile/ResProfileController";
import AddCatController from "../../ui/screens/add_category/AddCatController";
import AddFoodController from "../../ui/screens/add_food/AddFoodController";
import AddFoodCatController from "../../ui/screens/add_food_cat/AddFoodCatController";
import AddHomeSliderController from "../../ui/screens/add_home_slider/AddHomeSliderController";
import AddDealsController from "../../ui/screens/add_deals/AddDealsController";
import { MainScreen } from "../../ui/screens/main/MainScreen";
import InboxDetailController from "../../ui/screens/inbox_detail/InboxDetailController";
import VideoController from "../../ui/screens/video/VideoController";
import CommentController from "../../ui/screens/comment/CommentController";
import CameraController from "../../ui/screens/camera/CameraController";
import AddPostController from "../../ui/screens/add_post/AddPostController";
import TermAndConditionController from "../../ui/screens/term_and_condition/TermAndConditionController";
import PrivacyPolicyController from "../../ui/screens/privacy_policy/PrivacyPolicyController";
import EditProfileController from "../../ui/screens/edit_profile/EditProfileController";
import OrderDetailController from "../../ui/screens/order_detail/OrderDetailController";


type Props = {}

export const AllScreenRoutes : FC<Props> = ({}) =>
{
    return(
      <AllScreenStack.Navigator
        initialRouteName={"Splash"}>

        <AllScreenStack.Screen
          name={"Splash"}
          component={SplashController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"SignIn"}
          component={SignInController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"SignUp"}
          component={SignUpController}
          options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"Main"}
            component={MainScreen}
            options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"Home"}
          component={HomeController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"ResProfile"}
          component={ResProfileController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"AddCat"}
          component={AddCatController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"AddFood"}
          component={AddFoodController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"AddFoodCat"}
          component={AddFoodCatController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"AddHomeSlider"}
          component={AddHomeSliderController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"AddDeals"}
          component={AddDealsController}
          options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"InboxDetail"}
            component={InboxDetailController}
            options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"Video"}
          component={VideoController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"Comments"}
          component={CommentController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"Camera"}
          component={CameraController}
          options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"AddPost"}
            component={AddPostController}
            options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"PrivacyPolicy"}
          component={PrivacyPolicyController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"TermAndCondition"}
          component={TermAndConditionController}
          options={{headerShown: false}}/>

        <AllScreenStack.Screen
          name={"EditProfile"}
          component={EditProfileController}
          options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"OrderDetail"}
            component={OrderDetailController}
            options={{headerShown: false}}/>


      </AllScreenStack.Navigator>
    )
}
