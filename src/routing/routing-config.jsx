import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ForumPage } from "../pages/ForumPage";
import { RegisterPage } from "../pages/RegisterPage";
import { TwoFactorPage } from "../pages/TwoFactorPage";
import { CreatePostPage } from "../pages/CreatePostPage";
import { Logout } from "../components/Logout";
import { UserEditPage } from "../pages/UserEditPage";
import { AdminLayout } from "../components/Layouts/AdminLayout";
import { RequestTable } from "../components/Tables/RequestTable";
import { UserTable } from "../components/Tables/UserTable";
import { ForumLayout } from "../components/Layouts/ForumLayout";
import { Layout } from "../components/Layouts/Layout";
import { PostsPage } from "../pages/PostsPage";
import { ModeratorLayout } from "../components/Layouts/ModeratorLayout";
import { CommentEditPage } from "../pages/Moderator/CommentEditPage";
import { CommentApprovalPage } from "../pages/Moderator/CommentApprovalPage";
import { PostEditPage } from "../pages/Moderator/PostEditPage";
import { PostApprovalPage } from "../pages/Moderator/PostApprovalPage";
import {
  handleAuthedRedirect,
  handleNonAdminRedirect,
  handleNonMemberRedirect,
  handleNonModeratorRedirect,
} from "../services/RedirectService";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/login",
        Component: LoginPage,
        loader: () => {
          return handleAuthedRedirect();
        },
      },
      {
        path: "/register",
        Component: RegisterPage,
        loader: () => {
          return handleAuthedRedirect();
        },
      },
      {
        path: "/forum",
        Component: ForumLayout,
        children: [
          {
            index: true,
            Component: ForumPage,
            loader: () => {
              return handleNonMemberRedirect();
            },
          },
          {
            path: "new",
            Component: CreatePostPage,
            loader: () => {
              return handleNonMemberRedirect();
            },
          },
          {
            path: ":id",
            Component: PostsPage,
            loader: () => {
              return handleNonMemberRedirect();
            },
          },
          {
            path: ":id/edit",
            Component: PostEditPage,
            loader: () => {
              return handleNonMemberRedirect();
            },
          },
          {
            path: ":roomId/posts/:id",
            Component: CommentEditPage,
            loader: () => {
              return handleNonMemberRedirect();
            },
          },
        ],
      },
      {
        path: "/moderator",
        Component: ModeratorLayout,
        children: [
          {
            path: "posts",
            Component: PostApprovalPage,
            loader: () => {
              return handleNonModeratorRedirect();
            },
          },
          {
            path: "posts/:id/edit",
            Component: PostEditPage,
            loader: () => {
              return handleNonModeratorRedirect();
            },
          },
          {
            path: "comments",
            Component: CommentApprovalPage,
            loader: () => {
              return handleNonModeratorRedirect();
            },
          },
          {
            path: "comments/:id/edit",
            Component: CommentEditPage,
            loader: () => {
              return handleNonModeratorRedirect();
            },
          },
        ],
      },
      {
        path: "/admin",
        Component: AdminLayout,
        children: [
          {
            path: "requests",
            Component: RequestTable,
            loader: () => {
              return handleNonAdminRedirect();
            },
          },
          {
            path: "users",
            Component: UserTable,
            loader: () => {
              return handleNonAdminRedirect();
            },
          },
          {
            path: "users/:id/edit",
            Component: UserEditPage,
            loader: () => {
              return handleNonAdminRedirect();
            },
          },
        ],
      },
      {
        path: "/twofactor",
        Component: TwoFactorPage,
        loader: () => {
          return handleNonMemberRedirect();
        },
      },
      {
        path: "/logout",
        Component: Logout,
        loader: () => {
          return handleNonMemberRedirect();
        },
      },
      {
        path: "",
        element: <Navigate to="/login" />,
      },
    ],
  },
]);
