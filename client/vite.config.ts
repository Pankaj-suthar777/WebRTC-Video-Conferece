import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const PickedKeys = ["BACKEND_URL"];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {} as any;
  PickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
    server: {
      origin: "http://localhost:8000",
      proxy: {
        "/api": {
          target: "http://localhost:8000",
        },
      },
    },
    // server: {
    //   watch: {
    //     usePolling: true,
    //   },
    //   host: true, // Here
    //   strictPort: true,
    //   port: 5173,
    // },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
