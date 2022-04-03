import { useEffect } from "react";
import { Loading } from "./components/common/loading/loading";
import { useApp } from "./hooks/app/appHook";

export const StartUp = ({ children }: {children: any}) => {
    const {loading} = useApp()

  useEffect(() => {
      console.log("App initialize")
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
      return loading ? <Loading /> : children;
}