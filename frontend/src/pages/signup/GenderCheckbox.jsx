const GenderCheckbox = ({onChange}) => {
	return (
		<div className='flex pt-3'>
			<div className='form-control'>
				<label  className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-white'>男</span>
          <input name='gender' onChange={() => onChange('男')} type="radio" className="radio radio-info" />
				</label>
			</div>
			<div className='form-control ml-4'>
				<label  className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-white'>女</span>
					<input name='gender' onChange={() => onChange('女')} type="radio" className="radio radio-info" />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;