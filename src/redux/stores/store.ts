import { configureStore } from '@reduxjs/toolkit'
import AddPostSlice from '../slice/AddPostSlice'
import CameraSlice from '../slice/CameraSlice'
import MenuSlice from '../slice/CatSlice'
import DealSlice from '../slice/DealSlice'
import DialogSlice from '../slice/DialogSlice'
import EditUserSlice from '../slice/EditUserSlice'
import FeedSlice from '../slice/FeedSlice'
import FoodCatSlice from '../slice/FoodCatSlice'
import FoodReviewSlice from '../slice/FoodReviewSlice'
import FoodSlice from '../slice/FoodSlice'
import HomeSlice from '../slice/HomeSlice'
import InboxDetailSlice from '../slice/InboxDetailSlice'
import InboxSlice from '../slice/InboxSlice'
import LngSlice from '../slice/LngSlice'
import OrderDetailSlice from '../slice/OrderDetailSlice'
import OrderSlice from '../slice/OrderSlice'
import ResProfileSlice  from '../slice/ProfileSlice'
import SignInSlice from '../slice/SignInSlice'
import SignUpSlice from '../slice/SignUpSlice'
import SliderSlice from '../slice/SliderSlice'


export const store = configureStore({
    reducer: {
        Home : HomeSlice,
        SignUp : SignUpSlice,
        SignIn : SignInSlice,
        Lng : LngSlice,
        ResProfile : ResProfileSlice,
        Cat : MenuSlice,
        Food : FoodSlice,
        FoodCat : FoodCatSlice,
        FoodReview : FoodReviewSlice,
        EditUser : EditUserSlice,
        InboxDetail : InboxDetailSlice,
        Inbox : InboxSlice,
        Feed : FeedSlice,
        Camera : CameraSlice,
        AddPost : AddPostSlice,
        Dialog : DialogSlice,
        Order : OrderSlice,
        OrderDetail : OrderDetailSlice,
        Deal : DealSlice,
        Slider : SliderSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
