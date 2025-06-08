import { createContext, useContext, useState, ReactNode } from "react";

// ATENÇÃO: Altere esse valor apenas para desenvolvimento
const DEV_USER_ID = 1; // exemplo de ID fictício

type UserContextType = {
  usuarioId: number;
  setUsuarioId: (id: number) => void;
};

const UserContext = createContext<UserContextType>({
  usuarioId: DEV_USER_ID,
  setUsuarioId: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuarioIdState, setUsuarioId] = useState<number | null>(null);

  // Fallback: se ainda não setou nada, usa valor fixo para dev
  const usuarioId = usuarioIdState ?? DEV_USER_ID;

  return (
    <UserContext.Provider value={{ usuarioId, setUsuarioId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
