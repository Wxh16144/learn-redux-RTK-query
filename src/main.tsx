import { StrictMode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { createRoot } from "react-dom/client";
import { App as AntdApp, ConfigProvider } from "antd";
import "antd/dist/antd.css";
import { store } from "./store";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ConfigProvider theme={{ zeroRuntime: true }}>
        <AntdApp>
          <App />
        </AntdApp>
      </ConfigProvider>
    </ReduxProvider>
  </StrictMode>
);
