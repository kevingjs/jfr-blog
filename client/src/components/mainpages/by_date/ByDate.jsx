import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { useNavigate } from 'react-router-dom';
import Loading from '../utils/loading/Loading';

const ByDate = () => {
	const navigate = useNavigate();
	const state = useContext(GlobalState);
	const { newsAPI } = state;
	const { news: newsTools } = newsAPI;
	const [ news ] = newsTools;

	const [ mm, dd, yyyy ] = new Date().toLocaleDateString().replace(/\//g, '-').split('-');

	const [ dateRange, setDateRange ] = useState({
		since: new Date(new Date(`${yyyy}-${mm < 10 ? `0${mm}` : mm}-${dd}T00:00`).getTime() - 31 * 24 * 60 * 60 * 1000).getTime(),
		until: new Date(`${yyyy}-${mm < 10 ? `0${mm}` : mm}-${dd}T23:59`).getTime()
	});

	const [ inputValues, setInputValues ] = useState({
		since: `${new Date(dateRange.since).toLocaleDateString().replace(/\//g, '-').split('-')[2]}-${new Date(dateRange.since).toLocaleDateString().replace(/\//g, '-').split('-')[0] < 10 ? `0${new Date(dateRange.since).toLocaleDateString().replace(/\//g, '-').split('-')[0]}` : new Date(dateRange.since).toLocaleDateString().replace(/\//g, '-').split('-')[0]}-${new Date(dateRange.since).toLocaleDateString().replace(/\//g, '-').split('-')[1]}`,
		until: `${new Date(dateRange.until).toLocaleDateString().replace(/\//g, '-').split('-')[2]}-${new Date(dateRange.until).toLocaleDateString().replace(/\//g, '-').split('-')[0] < 10 ? `0${new Date(dateRange.until).toLocaleDateString().replace(/\//g, '-').split('-')[0]}` : new Date(dateRange.until).toLocaleDateString().replace(/\//g, '-').split('-')[0]}-${new Date(dateRange.until).toLocaleDateString().replace(/\//g, '-').split('-')[1]}`
	});

	const handleSince = e => {
		const { name, value } = e.target;
		setDateRange({
			...dateRange,
			[name]: new Date(`${value}T00:00`).getTime()
		});
		setInputValues({
			...inputValues,
			[name]: value
		});
	};

	const handleUntil = e => {
		const { name, value } = e.target;
		setDateRange({
			...dateRange,
			[name]: new Date(`${value}T23:59`).getTime()
		});
		setInputValues({
			...inputValues,
			[name]: value
		});
	};
	
	const filterByDate = news.filter(post => {
		const prodDate = new Date(post.createdAt).getTime();
		const { since, until } = dateRange;
		return prodDate >= since && prodDate <= until;
	}).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

	return (
		<div className='posts__container byDate'>
			
			<div className="posts__container--top">
				<h2 className="page__title">Por fecha</h2>
				<div className="page__tool">

					<div className="top__button__since">
						<span>Desde:</span>
						<input type="date" value={inputValues.since} name="since" onChange={handleSince} />
					</div>

					<div className="top__button__until">
						<span>Hasta:</span>
						<input type="date" value={inputValues.until} name="until" onChange={handleUntil} />
					</div>
				</div>
			</div>

			{
				news.length > 0 ?
					<div className="posts__container--content">
						{
							filterByDate.length > 0 ?
								filterByDate.map(post =>
									<div
										key={post._id}
										className='post__card'
										onClick={() => navigate(`/post/${post._id}`, {
											state: {
												post
											}
										})}
									>
										<div className="post__card--img">
											<img src={post.image.url} alt="" onContextMenu={e => e.preventDefault()} draggable={false} loading='lazy' />
										</div>

										<div className="post__card--info">
											<div className="info__title">{post.title}</div>
											<div className="info__description">{post.description}</div>
										</div>
									</div>
								)
							:
								<div className='posts__container--NotFound'>No se han encontrado publicaciones en este rango de fecha</div>
						}
					</div>
					:
					<Loading />
			}
		</div>
	);
};

export default ByDate;