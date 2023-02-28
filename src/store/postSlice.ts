import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  isVisible?:boolean;
}

type PostsState = {
  list: Post[];
}

const initialState: PostsState = {
  list: [],
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addAllPosts(state, action: PayloadAction<any>) {
        state.list=action.payload
      },
    showMorePosts(state, action: PayloadAction<number>) {
        state.list=state.list.map(item=>{
          if(item.userId===action.payload){
            item.isVisible=true
          }
          return item
        })
      },
    deletePost(state, action: PayloadAction<number>) {
      state.list = state.list.filter(post => post.id !== action.payload);
      }
  },
});

export const { addAllPosts, showMorePosts,deletePost } = postSlice.actions;

export default postSlice.reducer;