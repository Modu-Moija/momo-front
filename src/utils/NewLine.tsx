import React from "react";

type Props = {
  newLineString: string;
};

export const NewLine = ({ newLineString }: Props) => {
	return (
		<div>
			{newLineString.split("\n").map((txt, id) => (
				<div key={id}>
					{txt}
					<br />
				</div>
			))}
		</div>
	);
};
