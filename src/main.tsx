import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {router} from "../router.tsx";
import {RouterProvider} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>


      <RouterProvider router={router}>

      </RouterProvider>

      </QueryClientProvider>
  </React.StrictMode>,
)
