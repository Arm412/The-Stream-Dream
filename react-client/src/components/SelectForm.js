import React from 'react';

const SelectForm = (props) => {
	return (
		<form className={props.formClass}>
			<h2 className="center-text">{props.headerText}</h2>
			<div className="custom-select-div">
				<select
					className="media-select-dropdown primary-bg text-color"
					onChange={(e) => props.setFunction(e.target.value)}
					value={props.parentVariable}
				>
					{props.selectOptions.map((options) => (
						<option key={options} value={options.toLowerCase()}>
							{options}
						</option>
					))}
				</select>
			</div>
		</form>
	);
};

export default SelectForm;
