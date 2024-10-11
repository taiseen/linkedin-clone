import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import React from 'react';
import './styles/index.css';


const htmlRoot = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(htmlRoot);

const queryClient = new QueryClient();


reactRoot.render(
  <React.StrictMode>

    <BrowserRouter>

      {/* Context api || Composite ==> pattern */}
      <QueryClientProvider client={queryClient}>

        <App />

        {/* for dev tool at browser */}
        <ReactQueryDevtools initialIsOpen={false} />

      </QueryClientProvider>

    </BrowserRouter>

  </React.StrictMode>,
)