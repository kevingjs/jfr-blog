import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';

const ImageModal = ({ image, close }) => {
	return (
		<div className='bg-block' onClick={() => close(false)}>
			<div className="image__modal" onClick={e => e.stopPropagation()}>
				<img src={image.url} alt="" draggable={false} onContextMenu={e => e.preventDefault()} />
			</div>
		</div>
	);
};

const Gallery = () => {
	const [ modal, setModal ] = useState(false);
	const state = useContext(GlobalState);
	const { picsAPI } = state;
	const { pics: picsTools } = picsAPI;
	const [ pics ] = picsTools;
	// const [ pics ] = [[]]; // test Loading state

	return (
		<>
			{
				modal ?
					<ImageModal image = { modal } close = { setModal } />
				:
					null
			}
			{
				pics.length < 1 ?
					<Loading />
				:
					<div className='gallery__container'>
						{
							pics.map(pic =>
								<div key={pic._id} className='pics__card' onClick={() => setModal(pic)}>
									<img src={pic.url} alt="" draggable={false} onContextMenu={e => e.preventDefault()} loading='lazy' />
								</div>
							)
						}
					</div>
			}
		</>
	);
};

export default Gallery;