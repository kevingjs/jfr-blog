import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { useNavigate } from 'react-router-dom';
import Loading from '../utils/loading/Loading';

const Latest = () => {
	const navigate = useNavigate();
	const state = useContext(GlobalState);
	const { newsAPI } = state;
	const { news: newsTools } = newsAPI;
	const [ news ] = newsTools;

	const latestPost = news.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

	return (
		<div className='posts__container latest'>
			
			<div className="posts__container--top">
				<h2 className="page__title">Más recientes</h2>
			</div>

			{
				latestPost.length > 0 ?
					<div className="posts__container--content">
						{
							latestPost.map(post =>
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
						}
					</div>
				:
					<Loading />
			}
		</div>
	);
};

export default Latest;