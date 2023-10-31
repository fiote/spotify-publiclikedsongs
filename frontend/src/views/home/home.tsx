import './home.css';

export const Home = () => {
	const profile = JSON.parse(localStorage.getItem("profile") || "{}");

	const image = profile.images.sort((a: any, b: any) => b.width - a.width)[0].url;
	const name = profile.display_name;
	const followers = parseInt(profile.followers.total);
	const description = "Well well well, what do we have here?";

	let dsfollow = '';
	if (followers === 0) dsfollow = "Who needs followers anyway?";
	if (followers === 1) dsfollow = "You have a follower? That's so cool!";
	if (followers > 1) dsfollow = "You have " + followers + " followers, wow!";

	return (
		<div id='usercard' className="ui center aligned container">
			<div className="ui centered card">
				<div className="image">
					<div className="imagebox" style={{backgroundImage: "url("+image+")"}}></div>
				</div>
				<div className="content">
					<div className="header">{name}</div>
					<div className="meta">
						<span className="followers">{dsfollow}</span>
					</div>
					<div className="description">
						{description}
					</div>
				</div>
			</div>
		</div>
	)
};