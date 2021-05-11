import React from 'react';

const SelectForm = (props) => {
	return (
		<form className={props.formClass}>
			<h3 className="center-text">{props.headerText}</h3>
			<div className="custom-select-div">
				<select
					className="media-select-dropdown primary-bg text-color"
					onChange={(e) => props.setFunction(e.target.value)}
					value={props.parentVariable}
					id={props.selectorId}
				>
					{props.selectOptions.map((options) => (
						<option key={options} name={options} value={options.toLowerCase()}>
							{options}
						</option>
					))}
				</select>
			</div>
		</form>
	);
};

export default SelectForm;
