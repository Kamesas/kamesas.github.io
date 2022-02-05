import React, { FC } from "react";
// import { Timer } from "./Timer/Timer";
// import { Scroll } from "./Scroll/Scroll";
import { Form } from "./Form/Form";

interface iUseRefComponentProps {
  [key: string]: any;
}

export const UseRefComponent: FC<iUseRefComponentProps> = () => {
  return (
    <div>
      <Form />
      {/* <Scroll /> */}
      {/* <Timer /> */}
    </div>
  );
};
