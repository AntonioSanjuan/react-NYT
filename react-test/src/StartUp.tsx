import { useEffect } from "react";
import { Loading } from "./components/common/loading/loading";
import { useStartUp } from "./hooks/startUp/startUpHook";

export const StartUp = ({ children }: {children: any}) => {
    const {theme, loading} = useStartUp()

  useEffect(() => {
      console.log("App initialize")
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    useEffect(() => {
      document.body.setAttribute('data-theme', theme);
  }, [theme]);

      return loading ? <Loading /> : children;
}

