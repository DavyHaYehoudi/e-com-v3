// src/lib/http.ts
export const httpHelper = {
  get: async <T>(
    url: string,
    token: string | null,
    options?: RequestInit
  ): Promise<T> => {
    return fetchWrapper<T>(url, token, { method: "GET", ...options });
  },
  post: async <T, U = unknown>(
    url: string,
    body: U,
    token: string | null,
    options?: RequestInit
  ): Promise<T> => {
    return fetchWrapper<T>(url, token, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    });
  },
  put: async <T, U = unknown>(
    url: string,
    body: U,
    token: string | null,
    options?: RequestInit
  ): Promise<T> => {
    return fetchWrapper<T>(url, token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    });
  },
  patch: async <T, U = unknown>(
    url: string,
    body: U,
    token: string | null,
    options?: RequestInit
  ): Promise<T> => {
    return fetchWrapper<T>(url, token, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    });
  },
  delete: async <T>(
    url: string,
    token: string | null,
    options?: RequestInit
  ): Promise<T> => {
    return fetchWrapper<T>(url, token, { method: "DELETE", ...options });
  },
};

const fetchWrapper = async <T>(
  url: string,
  token: string | null,
  options?: RequestInit
): Promise<T> => {
  try {
    const headers: HeadersInit = {
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Utilisation de l'URL de base provenant de l'environnement
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

    const response = await fetch(fullUrl, { ...options, headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("An error occurred:", error.message);
  } else {
    console.error("An unexpected error occurred:", error);
  }
};
