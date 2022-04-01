import { useEffect } from "react";
import { Loading } from "./components/common/loading/loading";
import { useUser } from "./hooks/user/userHook";

export const StartUp = ({ children }: {children: any}) => {
    const {keepUserStateUpdated, startUpLoading} = useUser();
    
    useEffect(() => {
        console.log("App initialize")
        keepUserStateUpdated()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      return startUpLoading ? <Loading /> : children;
}

