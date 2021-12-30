import React from "react";

type Props = {
  newLineString: string;
};

export const NewLine = ({ newLineString }: Props) => {
  return (
    <div>
      {newLineString.split("\n").map((txt) => (
        <>
          {txt}
          <br />
        </>
      ))}
    </div>
  );
};
