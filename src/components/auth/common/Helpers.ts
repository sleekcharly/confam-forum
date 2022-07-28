import { Dispatch } from "react";

export const allowSubmit = (
  dispatch: Dispatch<any>,
  msg: string,
  setDisabled: boolean
) => {
  dispatch({ type: "isSubmitDisabled", ayload: setDisabled });
  dispatch({ payload: msg, type: "resultMsg" });
};
