import { useContext } from "react";
import { AuthContext } from "@navigation/AuthProvider";
function useUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
}

export default useUser;
