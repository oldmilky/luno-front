import { TypeRootState } from "@/store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> =
  useSelector;

export const useAuth = () => useTypedSelector((state) => state.user);
