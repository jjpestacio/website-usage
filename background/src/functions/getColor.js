const randomNum = max => Math.floor(Math.random() * max);

const randomColor = () =>
	'rgb(' + randomNum(256) + ',' + randomNum(256) + ',' + randomNum(256) + ')'


// For some popular websites, there are defaults
// (https://en.wikipedia.org/wiki/List_of_most_popular_websites)
// For other websites, colors are chosen at random
export const getColor = url => {
	switch (url) {
		case 'amazon': return 'rgb(255,153,0)';
		case 'apple': return 'rgb(102,102,102)';
		case 'craigslist': return 'rgb(96,2,94)';
		case 'dropbox': return 'rgb(0,126,229)';
		case 'ebay': return 'rgb(134,177,37)';
		case 'facebook': return 'rgb(59,89,152)';
		case 'instagram': return 'rgb(246,41,72)';
		case 'google': return 'rgb(67,133,246)';
		case 'linkedin': return 'rgb(0,119,181)';
		case 'microsoft': return 'rgb(127,186,0)';
		case 'netflix': return 'rgb(229,9,20)';
		case 'reddit': return 'rgb(255,69,0)';
		case 'soundcloud': return 'rgb(255,108,0)';
		case 'twitter': return 'rgb(42,169,224)';
		case 'tumblr': return 'rgb(55,70,93)';
		case 'spotify': return 'rgb(35,207,95)';
		case 'stackoverflow': return 'rgb(244,128,36)';
		case 'whatsapp': return 'rgb(80,202,93)';
		case 'wikipedia': return 'rgb(238,238,238)';
		case 'yahoo': return 'rgb(123,0,153)';
		case 'youtube': return 'rgb(210,54,53)';
		default: return randomColor();
	}
}