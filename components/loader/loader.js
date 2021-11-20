import { useState, useEffect } from "react";
import Router from "next/router";

const Layout = props => {
  
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
        const handleStart = (url) => (url !== Router.asPath) && setIsLoading(true);
        const handleComplete = (url) => (url === Router.asPath) && setIsLoading(false);

        Router.events.on('routeChangeStart', handleStart)
        Router.events.on('routeChangeComplete', handleComplete)
        Router.events.on('routeChangeError', handleComplete)

        return () => {
            Router.events.off('routeChangeStart', handleStart)
            Router.events.off('routeChangeComplete', handleComplete)
            Router.events.off('routeChangeError', handleComplete)
        }
  }, [isLoading]);

  return (
    <div>
        { isLoading ?
            <div className="Loading">
               <div className="wrap">
                <div className="loading">
                    <div className="bounceball"></div>
                    <div className="text">CHARGEMENT ...</div>
                </div>
                </div>
            </div>
        : props.children }
    </div>
  );
}

export default Layout;

