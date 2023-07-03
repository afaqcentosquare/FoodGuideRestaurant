import React from "react";
import { StyleSheet, View } from "react-native";
import { CommentInfoLayout } from "./CommentInfolayout";
import { CommentReviewLayout } from "./CommentReviewLayout";
import { postObj } from "../../../models/PostModel";

type Props = {
  item : any,
  postData : postObj
}

export const CommentItem = React.memo<Props>((props) =>
{
  const checkItem = () =>
  {
    switch (props.item.name)
    {
      case "header":
        return (
          <CommentInfoLayout
            postData={props.postData}/>
        )
      case "review":
        return (
          <CommentReviewLayout/>
        )
    }
  }

  return(
    <View>
      {checkItem()}
    </View>
  )
})

const styles = StyleSheet.create({

})
