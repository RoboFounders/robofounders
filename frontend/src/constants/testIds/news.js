// Test IDs for the Robotics News feature. Naming follows the directive in
// ./auth.js (keys camelCase, values kebab-case `<feature>-<element>`).

export const NEWS = {
	page: 'news-page',
	feed: 'news-feed',
	card: 'news-card', // used dynamically as `${NEWS.card}-${id}`
	cardSource: 'news-card-source',
	cardLink: 'news-card-link',
	filter: 'news-filter', // used dynamically as `${NEWS.filter}-${category}`
	empty: 'news-empty',
	error: 'news-error',
	viewAll: 'news-view-all',
};
