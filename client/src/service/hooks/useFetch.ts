import { useState, useCallback } from "react";
import { httpHelper } from "../http";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store/store";
// import { setTokenExpired } from "@/redux/slice/authSlice";
// import { isTokenExpired } from "@/app/(public)/utils/token";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface useFetchOptions<B = unknown> {
  method?: HttpMethod;
  requestOptions?: RequestInit; // Autres options pour l'appel API
  requiredCredentials?: boolean;
}
export const useFetch = <T, B = unknown>(
  url: string,
  {
    method = "GET",
    requestOptions,
    requiredCredentials,
  }: useFetchOptions<B> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const triggerFetch = useCallback(
    async (bodyData?: B) => {
      setLoading(true);
      setError(null);
      if (token && isTokenExpired(token)) {
        dispatch(setTokenExpired());
        return;
      }
      try {
        // Si bodyData est undefined, le rendre par défaut à un objet vide
        const payload = bodyData !== undefined ? bodyData : ({} as B);
        let result: T;

        switch (method) {
          case "POST":
            result = await httpHelper.post<T, B>(
              url,
              payload,
              requiredCredentials ? token : null,
              requestOptions
            );
            break;
          case "PUT":
            result = await httpHelper.put<T, B>(
              url,
              payload,
              requiredCredentials ? token : null,
              requestOptions
            );
            break;
          case "PATCH":
            result = await httpHelper.patch<T, B>(
              url,
              payload,
              requiredCredentials ? token : null,
              requestOptions
            );
            break;
          case "DELETE":
            result = await httpHelper.delete<T>(
              url,
              requiredCredentials ? token : null,
              requestOptions
            );
            break;
          default:
            result = await httpHelper.get<T>(
              url,
              requiredCredentials ? token : null,
              requestOptions
            );
        }

        setData(result);
        return result;
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    },
    [url, method, token, requiredCredentials, requestOptions, dispatch]
  );

  return { data, loading, error, triggerFetch };
};
