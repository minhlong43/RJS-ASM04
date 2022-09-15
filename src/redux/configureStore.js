import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Department } from "./department";
import { Staffs } from "./staff";
import { Salary } from "./salary";
import { StaffInDept } from "./staffInDept";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      department: Department,
      salary: Salary,
      staffInDept: StaffInDept,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
