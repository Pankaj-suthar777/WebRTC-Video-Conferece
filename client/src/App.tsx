import { useRoutes } from "react-router-dom";
import Provider from "./Provider";
import GetRoutes from "./router";
import BarLoaderComponent from "./components/layout/bar-loader-component";
import { ReactQueryDevtools } from "react-query/devtools";

const AppRoutes = ({ routes }: { routes: any }) => {
  const elements = useRoutes(routes);
  return elements;
};

const App = () => {
  const { loading, routes } = GetRoutes();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-indigo-600 text-3xl">
        <BarLoaderComponent />
      </div>
    );
  }

  return (
    <Provider>
      <AppRoutes routes={routes} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </Provider>
  );
};

export default App;
