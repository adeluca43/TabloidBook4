import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoutes";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import CreatePost from "./Posts/CreatePost";
import Home from "./Home/Home";
import ManageCategories from "./category/ManageCategories";
import PostDetails from "./Posts/PostDetails";
import Tags from "./tags/Tags";
import MyPosts from "./Posts/MyPosts";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails loggedInUser={loggedInUser}/>
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/posts/create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreatePost loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="categories/manage"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <ManageCategories />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/myposts"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyPosts loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route
        path="posts/:postId"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <PostDetails />
          </AuthorizedRoute>
        }
      />
      <Route
        path="tags/manage"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
            <Tags />
          </AuthorizedRoute>
        }
      ></Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
