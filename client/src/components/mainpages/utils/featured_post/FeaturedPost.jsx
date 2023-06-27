import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FeaturedPost = ({ news, arrow }) => {
	const navigate = useNavigate();
	const featuredPost = news.find(news => news.featured);
	const { _id, title, description, image: { url } } = featuredPost;

	return (
		<div className='featuredCard'>

			<div className="featuredCard__info">
				<div className="featuredCard__info--title">{title}</div>
				<div className="featuredCard__info--description">{description}</div>
				<div
					className='featuredCard__info--readMore'
					onClick={() => navigate(`/post/${_id}`, {
						state: {
							post: featuredPost
						}
					})}
				>
					<span>Leer más</span>
					{ arrow }
				</div>
			</div>

			<div className="featuredCard__img">
				<img src={url} alt="" onContextMenu={e => e.preventDefault()} draggable={false}/>
			</div>

		</div>
	);
};

export default FeaturedPost;