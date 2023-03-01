import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
//redux
import { useAppSelector, useAppDispatch } from "../hooks";
import { showMorePosts, deletePost } from "../store/postSlice";
//
import { useTranslation } from "react-i18next"; //i18next

export default function News() {
  const [count, setCount] = useState<number>(1);
  const { t } = useTranslation(); //i18n
  //redux
  const posts = useAppSelector((state) =>
    state.posts.list.filter((item) => item.isVisible === true)
  );
  const dispatch = useAppDispatch();
  //
  const showMore = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    dispatch(showMorePosts(count));
  }, [count]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 164px)",
        backgroundColor: "rgb(206, 255, 159)",
        padding: "30px 0",
      }}
    >
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography sx={{ textShadow: "1px 1px black" }} variant="h4">
          {t("header")}
        </Typography>
      </Box>
      {posts.map((post) => (
        <Box
          key={post.id}
          sx={{
            padding: "10px 25px 10px 45px",
            display: "flex",
            justifyContent: "space-between",
            "&:hover": {
              backgroundColor: "rgba(77, 77, 77, 0.05)",
            },
          }}
        >
          <Box>
            <Typography sx={{ textDecorationLine: "underline" }} variant="h6">
              {post.title}
            </Typography>
            <Typography>{post.body}</Typography>
          </Box>
          <Box sx={{ paddingTop: "3px", marginLeft: "25px", color: "red" }}>
            <ClearIcon
              sx={{ cursor: "pointer", fontSize: 25 }}
              onClick={() => dispatch(deletePost(post.id))}
            />
          </Box>
        </Box>
      ))}
      <Box sx={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          sx={{
            backgroundColor: "rgb(14,23,36)",
            "&:hover": {
              backgroundColor: "rgba(14, 23, 36, 0.77)",
            },
            color: "white",
            padding: "5px 25px",
          }}
          onClick={showMore}
        >
          {t("showMore")}
        </Button>
      </Box>
    </Box>
  );
}
