import { reducer as dataUser } from "./user/user-data.slice";
import { reducer as userReducer } from "./user/user.slice";

export const reducers = {
  user: userReducer,
  dataUser: dataUser,
};
