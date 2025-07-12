import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import { PumpProvider } from "@/context/PumpContext";

const Login = lazy(() => import("@/pages/Login"));
const PumpOverview = lazy(() => import("@/pages/PumpOverview"));
const PumpDetail = lazy(() => import("@/pages/PumpDetail"));

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <>
          <MainLayout />
        </>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "pumps",
        element: (
          <PumpProvider>
            <PumpOverview />
          </PumpProvider>
        ),
      },
      {
        path: "pumps/:id",
        element: <PumpDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

