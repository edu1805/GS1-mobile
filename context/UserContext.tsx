import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  usuarioId: number | null;
  setUsuarioId: (id: number) => void;
};

const UserContext = createContext<UserContextType>({
  usuarioId: null,
  setUsuarioId: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ usuarioId, setUsuarioId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
