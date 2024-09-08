import { useRoutes } from "react-router-dom";
import Provider from "./Provider";
import GetRoutes from "./router";

const AppRoutes = ({ routes }: { routes: any }) => {
  const elements = useRoutes(routes);
  return elements;
};

const App = () => {
  const { loading, routes } = GetRoutes();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <Provider>
      {/* <AppRoutes /> */}
      <AppRoutes routes={routes} />
    </Provider>
  );
};

export default App;
