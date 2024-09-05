import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {router} from "../router.tsx";
import {RouterProvider} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import {PostHogProvider} from "posthog-js/react";

const options = {
    api_host: import.meta.env.REACT_APP_PUBLIC_POSTHOG_HOST
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <PostHogProvider
          apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
          options={options}
      >
      <QueryClientProvider client={queryClient}>


      <RouterProvider router={router}>

      </RouterProvider>

    </QueryClientProvider>
     <Toaster />
      </PostHogProvider>
  </React.StrictMode>,
)
