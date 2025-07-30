const GenderCheckbox = () => {
	return (
		<div className='flex p-3'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-white'>Male</span>
          <input type="checkbox" className="checkbox checkbox-info" />
				</label>
			</div>
			<div className='form-control ml-4'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-white'>Female</span>
					<input type="checkbox" className="checkbox checkbox-info" />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;