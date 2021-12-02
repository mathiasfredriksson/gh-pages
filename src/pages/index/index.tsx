import React from "react";
import ReactDOM from "react-dom";
import Moon from "../../moon";

const Index = () => {
	return (
		<div className="container">
			<Moon />
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Index />
	</React.StrictMode>,
	document.getElementById("root")
);
