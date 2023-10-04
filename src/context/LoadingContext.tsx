import { createContext, useState } from "react";
import { Loading } from "../components/Loading";

interface ILoadingContext {
    showLoading: () => void;
    hideLoading: () => void;
}

const LoadingContext = createContext<ILoadingContext>({
    showLoading: () => {},
    hideLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const showLoading = () => setLoading(true);
    const hideLoading = () => setLoading(false);
    return (
        <LoadingContext.Provider
            value={{ showLoading, hideLoading }}
        >
            {children}
            {loading && <Loading />}
        </LoadingContext.Provider>
    );
}

export default LoadingContext;